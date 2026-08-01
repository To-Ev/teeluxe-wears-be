const bcrypt = require('bcrypt');
const UserDB = require('../../model/Users');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) =>{
    const {email, password} = req.body;

    try {
        if(!email || !password) return res.status(400).json({ err: "Enter email and password!"});

        const foundUser = await UserDB.findOne({email}).exec();
        if(!foundUser) return res.status(401).json({ err: `Invalid Email! try again.` });

        const match = await bcrypt.compare(password, foundUser.password);
        if(!match) return res.status(401).json({ err: "Invalid password"});

        const roles = Object.values(foundUser.roles);

        // Add jwt token
        const accessToken = jwt.sign(
            {
                user: {
                    id: foundUser._id,
                    name: foundUser.name,
                    roles: roles,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '45m'}
        );

        const refreshToken = jwt.sign(
            {
                user: {
                    id: foundUser._id,
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '7d'}
        );

        // Sanitize user object before sending
        const safeUser = {
            id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            roles: foundUser.roles,
        };

        // save in DataBase
        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ msg: "Login successful!", token: accessToken, user: safeUser });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

module.exports = handleLogin