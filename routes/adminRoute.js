const express = require("express");
const { verifyJWT } = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/ROLES_LIST");
const { getAllUsers, addNewUser, updateUserInfo, deleteUser } = require("../controllers/admin/adminController");

const router = express.Router();

// @desc Admin route to get all users (protected)
// @access private/admin
router.get("/", verifyJWT, verifyRoles(ROLES_LIST.Admin), getAllUsers);

// @desc Add a new User (admin only)
// @access private/admin
router.post("/", verifyJWT, verifyRoles(ROLES_LIST.Admin), addNewUser);

// @desc Update user information (admin only)
// @access private/admin
router.put("/:id", verifyJWT, verifyRoles(ROLES_LIST.Admin), updateUserInfo);

// @desc Delete a user (admin only)
// @access private/admin
router.delete("/:id", verifyJWT, verifyRoles(ROLES_LIST.Admin), deleteUser);

module.exports = router;