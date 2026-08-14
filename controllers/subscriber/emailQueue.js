const Queue = require("bull");
const { sendNewProductEmail } = require("./sendNewProductEmail");
const { URL } = require("url");

const redisUrl = new URL(process.env.REDIS_URL);

const emailQueue = new Queue("emailQueue", {
  redis: {
    host: redisUrl.hostname,
    port: redisUrl.port,
    password: redisUrl.password,
    tls: {} // Upstash requires TLS
  }
});

// Process jobs
emailQueue.process(async (job) => {
  const { subscriber, product } = job.data;
  await sendNewProductEmail(subscriber, product);
});

// Logging
emailQueue.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

emailQueue.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

//  Startup connection check
emailQueue.on("ready", () => {
  console.log("Bull queue connected to Redis");
});

emailQueue.on("error", (err) => {
  console.error("Bull queue Redis connection error:", err);
});

module.exports = emailQueue;
