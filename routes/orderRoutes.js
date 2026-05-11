const express = require("express");
const { verifyJWT } = require("../middleware/verifyJWT");
const { getUsersOrders, getOrdersById } = require("../controllers/order/getOrders");

const router = express.Router();

// @Desc Get all orders for the logged-in user
// @access private
router.get("/my-orders", verifyJWT, getUsersOrders);

// @Desc Get order details by ID for the logged-in user
// @access private
router.get("/:id", verifyJWT, getOrdersById);

module.exports = router
