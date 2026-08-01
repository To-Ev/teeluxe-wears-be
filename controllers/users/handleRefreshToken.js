const UserDB = require('../../model/Users');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) =>{
    const Cookies = req.cookies;

    if(!Cookies?.refreshToken) return res.status(400).json({ err: "No token" });
    const refreshToken = Cookies.refreshToken;

    try {
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Find user by ID
        const foundUser = await UserDB.findById(decoded.user.id).exec();
        if (!foundUser) return res.sendStatus(403);

        // Compare stored refresh token
        if (foundUser.refreshToken !== refreshToken) return res.sendStatus(403);

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

        // Optional: rotate refresh token
        const newRefreshToken = jwt.sign(
            { user: { id: foundUser._id } },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        foundUser.refreshToken = newRefreshToken;
        await foundUser.save();

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken });
    } catch (err) {
        console.error(err);
        return res.sendStatus(403);
    }
}

module.exports = handleRefreshToken