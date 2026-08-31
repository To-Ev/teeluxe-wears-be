const UserDB = require('../../model/Users');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) =>{
    const Cookies = req.cookies;

    if(!Cookies?.refreshToken) return res.status(400).json({ err: "No token" });
    const refreshToken = Cookies.refreshToken;

    try {
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if(!decoded) return res.status(403).json({ err: "Invalid token" });
        // Find user by ID
        const foundUser = await UserDB.findById(decoded.user.id).exec();
        if (!foundUser) return res.status(404).json({ err: "User does not exist" });

        // Compare stored refresh token
        if (foundUser.refreshToken !== refreshToken) return res.status(403).json({ err: "Token does not match" });

        const roles = Object.values(foundUser.roles);

        // Issue new access token
        const accessToken = jwt.sign(
            {
                user: {
                    id: foundUser._id,
                    name: foundUser.name,
                    roles,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "45m" }
        );

        res.json({ accessToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Failed due to server error" });;
    }
}

module.exports = handleRefreshToken