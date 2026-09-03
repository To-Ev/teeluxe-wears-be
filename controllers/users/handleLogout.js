const UserDB = require('../../model/Users');

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(204); // No content

  const refreshToken = cookies.refreshToken;
  const foundUser = await UserDB.findOne({ refreshToken }).exec();

  if (foundUser) {
    foundUser.refreshToken = "";
    await foundUser.save();
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in prod, false in dev
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.sendStatus(204);
};

module.exports = handleLogout