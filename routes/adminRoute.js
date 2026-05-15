const express = require("express");
const { verifyJWT } = require("../middleware/verifyJWT");
const { getAllUsers } = require("../controllers/admin/adminController");

const router = express.Router();

// Admin route to get all users (protected)
// @access private

router.get("/users", verifyJWT, getAllUsers);

module.exports = router;