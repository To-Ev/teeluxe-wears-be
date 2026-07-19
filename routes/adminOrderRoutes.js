const express = require('express');
const { verifyJWT, Admin } = require("../middleware/verifyJWT");
const { getAllOrders, updateOrderStatus, deleteOrder, getOrderDetails } = require("../controllers/admin/orderAdminController");

const router = express.Router();

// @desc get all orders
// @access private/admin
router.get("/", verifyJWT, Admin, getAllOrders);

// @desc GET order details by ID (admin only)
// @access private/admin
router.get("/:id", verifyJWT, Admin, getOrderDetails);

// @desc update order status
// @access private/admin
router.put("/:id", verifyJWT, Admin, updateOrderStatus);

// @desc delete order
// @access private/admin
router.delete("/:id", verifyJWT, Admin, deleteOrder);

module.exports = router;