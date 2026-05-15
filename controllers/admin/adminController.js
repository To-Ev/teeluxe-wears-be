const UserDB = require("../models/UserDB");

const getAllUsers = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }  
    const users = await UserDB.find().select("-password"); // Exclude password
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
};