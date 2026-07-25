const express = require('express');
const { verifyJWT } = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/ROLES_LIST");
const { getAllProducts } = require("../controllers/admin/productAdminController");

const router = express.Router();

// @desc Get all products (admin only)
// @access private/admin
router.get("/", verifyJWT, verifyRoles(ROLES_LIST.Admin), getAllProducts);

module.exports = router;