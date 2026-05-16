const Order = require("../../model/Order");

const getAllOrders = async (req, res) => {  
    try {
        const orders = await Order.find().populate('user', 'name email');
        res.json(orders);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ err: "Error fetching orders" });
    }   
};

module.exports = { getAllOrders };