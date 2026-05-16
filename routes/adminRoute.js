const express = require("express");
const { verifyJWT, Admin } = require("../middleware/verifyJWT");
const { getAllUsers, addNewUser, updateUserInfo, deleteUser } = require("../controllers/admin/adminController");

const router = express.Router();

// @desc Admin route to get all users (protected)
// @access private/admin
router.get("/", verifyJWT, Admin, getAllUsers);

// @desc Add a new User (admin only)
// @access private/admin
router.post("/", verifyJWT, Admin, addNewUser);

// @desc Update user information (admin only)
// @access private/admin
router.put("/:id", verifyJWT, Admin, updateUserInfo);

// @desc Delete a user (admin only)
// @access private/admin
router.delete("/:id", verifyJWT, Admin, deleteUser);

module.exports = router;