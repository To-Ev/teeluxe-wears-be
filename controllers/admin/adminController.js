const UserDB = require("../../model/Users"); // Import the User model
const bcrypt = require("bcrypt"); // For password hashing

const getAllUsers = async (req, res) => {

  try {
    const users = await UserDB.find().select("-password"); // Exclude password
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server error" });
  }
};

const addNewUser = async (req, res) => {
    const { name, email, password, roles } = req.body;

    try {
        // Create a new user
        let user = await UserDB.findOne({ email });

        if (user) {
          return res.status(400).json({ err: "User already exists" });
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = new UserDB({ 
          name, 
          email, 
          password: hashedPwd, 
          roles: roles || ["customer"] 
        });
        await newUser.save();

        res.status(201).json({ msg: "User created successfully", newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Server error" });
    }
};

const updateUserInfo = async (req, res) => {

  const { id } = req.params;
  const { name, email, roles } = req.body;

  try {
    // Find the user by ID
    const user = await UserDB.findById(id);

    if (!user) {
      return res.status(404).json({ err: "User not found" });
    };

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.roles = roles || user.roles;

    // Save the updated user
    const updatedUser = await user.save();

    res.json({ msg: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server error" });
  }
}; 

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserDB.findById(id)

    if(user) {
      await user.deleteOne();
      res.status(200).json({ msg: "User deleted successfully" });
    } else {
      res.status(404).json({ err: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server error" });
  }
}

module.exports = {
  getAllUsers,
  addNewUser,
  updateUserInfo,
  deleteUser
};