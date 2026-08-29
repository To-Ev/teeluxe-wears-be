// const mjml2html = require("mjml");
// const Subscribers = require("./model/subscriber");
// const mongoose = require("mongoose");
// const dotenv = require('dotenv');
// dotenv.config();

const connectDb = require('./config/db');

const nodemailer = require("nodemailer");
const Subscribers = require("./model/subscriber");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { URL } = require("url");

const redisUrl = new URL(process.env.REDIS_URL);

const getTransporter = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

async function testEmail() {
  try {
    // Connect to MongoDB
    connectDb();

    // Fetch subscribers
    const subscribers = await Subscribers.find();
    console.log("Sending to:", subscribers.map(s => s.email));

    const transporter = getTransporter();

    // Send a simple message
    for (const sub of subscribers) {
      const info = await transporter.sendMail({
        from: `"Derayo & Co" <${process.env.EMAIL_USER}>`,
        to: sub.email,
        subject: "Test Email",
        text: "Hello! This is a test message to check email delivery.",
      });

      console.log(`Message sent to ${sub.email}: ${info.messageId}`);
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error sending test email:", err);
  }
}

testEmail();


// async function subscriberTest() {
//   try {
//     connectDb();

//     console.log("Connected to MongoDB");

//     const subscribers = await Subscribers.find();
//     console.log("Sending to:", subscribers.map(s => s.email));

//     // Close connection when done
//     await mongoose.disconnect();
//   } catch (err) {
//     console.error("Error fetching subscribers:", err);
//   }
// }

// subscriberTest();