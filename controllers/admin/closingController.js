const Orders = require("../../model/Order");
const ClosingLog = require("../../model/ClosingLog");

const yearClosing = async (req, res) => {
  try {
    // Count orders before deletion
    const orderCount = await Orders.countDocuments();

    if (orderCount === 0) {
      return res.status(400).json({ err: "No orders to close" });
    }

    const totalRevenue = await Orders.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    // Delete all orders
    await Orders.deleteMany({});

    // Log the closing event
    const log = new ClosingLog({
      admin: req.user._id,
      clearedOrders: orderCount,
      resetRevenue: totalRevenue[0]?.total || 0
    });
    
    await log.save();

    res.status(200).json({
      message: "Year closed successfully",
      totalOrders: 0,
      totalSales: 0,
      logId: log._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Failed to close year" });
  }
};

const fetchClosingLogs = async (req, res) => {

  try {
    const closingLogs = await ClosingLog.find().populate("admin", "name email");
    
    res.json(closingLogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Failed to fetch log" });
  }
}

module.exports = { yearClosing, fetchClosingLogs };
