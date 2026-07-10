const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "E-Commerce",
        })
        console.log("MongoDB connection successful!");
    } catch (err) {
        console.log("MongoDB connection failed.", err.message);
        process.exit(1);
    }
}

module.exports = connectDB