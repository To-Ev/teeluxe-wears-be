const express = require('express');
const { verifyJWT, Admin } = require("../middleware/verifyJWT");
const { getAllProducts } = require("../controllers/admin/productAdminController");

const router = express.Router();

// @desc Get all products (admin only)
// @access private/admin
router.get("/", verifyJWT, Admin, getAllProducts);

module.exports = router;