const Order = require("../../model/Order");

const getAllOrders = async (req, res) => {  
    try {
        const orders = await Order.find().populate('user', 'name email');
        if(orders.length === 0) {
            return res.status(404).json({ err: "No orders found" });
        };
        res.json(orders);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ err: "Error fetching orders" });
    }   
};

const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const order = await Order.findById(id).populate('user', 'name');

        if (!order) {
            return res.status(404).json({ err: "Order not found" });
        }  
        order.status = status || order.status;
        order.isDelivered = 
            status === "Delivered" ? true : order.isDelivered;
        order.deliveredAt = 
            status === "Delivered" ? Date.now() : order.deliveredAt;

        const updatedOrder = await order.save();
        res.json({ msg: "Order status updated", order: updatedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Server error" });
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ err: "Order not found" });
        }
        await Order.findByIdAndDelete(id);
        res.json({ msg: "Order deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Server error" });
    }
};

module.exports = { getAllOrders, updateOrderStatus, deleteOrder };