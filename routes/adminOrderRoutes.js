const express = require('express');
const { verifyJWT, Admin } = require("../middleware/verifyJWT");
const { getAllOrders } = require("../controllers/admin/orderAdminController");

const router = express.Router();

// @desc get all orders
// @access private/admin
router.get("/", verifyJWT, Admin, getAllOrders);

module.exports = router;