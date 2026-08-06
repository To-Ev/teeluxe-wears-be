const express = require('express');
const { verifyJWT } = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/ROLES_LIST");
const { getAllOrders, updateOrderStatus, deleteOrder, getOrderDetails } = require("../controllers/admin/orderAdminController");
const { yearClosing, fetchClosingLogs } = require('../controllers/admin/closingController');

const router = express.Router();

// Always put static routes before dynamic /:id

// @desc get all orders
router.get("/", verifyJWT, verifyRoles(ROLES_LIST.Admin), getAllOrders);

// @desc clear all orders (admin only)
router.post("/year-closing", verifyJWT, verifyRoles(ROLES_LIST.Admin), yearClosing);

// @desc fetch closing logs (admin only)
router.get("/closing-logs", verifyJWT, verifyRoles(ROLES_LIST.Admin), fetchClosingLogs);

// @desc GET order details by ID (admin only)
router.get("/:id", verifyJWT, verifyRoles(ROLES_LIST.Admin), getOrderDetails);

// @desc update order status
router.put("/:id", verifyJWT, verifyRoles(ROLES_LIST.Admin), updateOrderStatus);

// @desc delete order
router.delete("/:id", verifyJWT, verifyRoles(ROLES_LIST.Admin), deleteOrder);


module.exports = router;