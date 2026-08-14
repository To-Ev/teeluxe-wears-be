const Subscriber = require('../../model/Subscriber');


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
        res.status(201).json({ msg: "Subscriber added successfully" });
    } catch (error) {
        console.error('Error adding subscriber:', error);
        res.status(500).json({ err: "Failed to add subscriber" });
    }
};

module.exports = { addSubscriber };