const express = require('express');
const { verifyJWT } = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/ROLES_LIST");
const { getAllOrders, updateOrderStatus, deleteOrder, getOrderDetails } = require("../controllers/admin/orderAdminController");

const router = express.Router();

// @desc get all orders
// @access private/admin
router.get("/", verifyJWT, verifyRoles(ROLES_LIST.Admin), getAllOrders);

// @desc GET order details by ID (admin only)
// @access private/admin
router.get("/:id", verifyJWT, verifyRoles(ROLES_LIST.Admin), getOrderDetails);

// @desc update order status
// @access private/admin
router.put("/:id", verifyJWT, verifyRoles(ROLES_LIST.Admin), updateOrderStatus);

// @desc delete order
// @access private/admin
router.delete("/:id", verifyJWT, verifyRoles(ROLES_LIST.Admin), deleteOrder);

module.exports = router;