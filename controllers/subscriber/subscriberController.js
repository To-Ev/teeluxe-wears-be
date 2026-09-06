const Subscriber = require('../../model/Subscriber');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const addSubscriber = async (req, res) => {

    const { email } = req.body;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ err: "Invalid email format" });
    };

    try {
        // Check if the email already exists
        const normalizedEmail = email.toLowerCase();
        const existingSubscriber = await Subscriber.findOne({ email: normalizedEmail });

        if (existingSubscriber) {
            return res.status(400).json({ err: "Email already subscribed" });
        }

        // Create a new subscriber
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        await transporter.sendMail({
            from: `"Derayo & Co" <${process.env.EMAIL_USER}>`,
            to: newSubscriber.email,
            subject: "Welcome to Derayo & Co!",
            text: "Thanks for subscribing! If this email landed in Spam, please mark it as 'Not Spam' so you never miss our updates.",
        });

        res.status(201).json({ msg: "Subscribed successfully" });
    } catch (error) {
        console.error('Error adding subscriber:', error);
        res.status(500).json({ err: "Failed to add subscriber" });
    }
};

const removeSubscriber = async (req, res) => {
    
    const { email } = req.params;
    const normalizedEmail = email.toLowerCase();

    try {
        const result = await Subscriber.updateOne(
        { email: normalizedEmail },
        { subscribed: false }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send("Email not found or already unsubscribed.");
        }

        res.send("You have successfully unsubscribed.");
    } catch (err) {
        res.status(500).send("Error unsubscribing.");
    }
};


module.exports = { addSubscriber, removeSubscriber };