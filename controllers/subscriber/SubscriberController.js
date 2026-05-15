const Subscriber = require('../../model/Subscriber');


const addSubscriber = async (req, res) => {

    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ err: "Email is required" });
    }

    try {
        // Check if the email already exists
        const existingSubscriber = await Subscriber.findOne({ email });
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