const express = require('express');
const { verifyJWT, Admin } = require("../middleware/verifyJWT");
const { getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/admin/orderAdminController");

const router = express.Router();

// @desc get all orders
// @access private/admin
router.get("/", verifyJWT, Admin, getAllOrders);

// @desc update order status
// @access private/admin
router.put("/:id", verifyJWT, Admin, updateOrderStatus);

// @desc delete order
// @access private/admin
router.delete("/:id", verifyJWT, Admin, deleteOrder);

module.exports = router;