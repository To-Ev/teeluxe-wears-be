const Order = require("../../model/Order");


const getUsersOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });//sort by most recent orders first
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Error fetching orders" });
  }
};

const getOrdersById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
      return res.status(404).json({ err: "Order not found" });
    };
    // return the full order details
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Error fetching order" });
  }
}
module.exports = { getUsersOrders, getOrdersById };