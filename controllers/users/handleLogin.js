const bcrypt = require('bcrypt');
const User = require('../../model/Users');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) =>{
    const {email, password} = req.body;

    try {
        if(!email || !password) return res.status(400).json({ err: "Enter email and password!"});

        const foundUser = await User.findOne({email}).exec();
        if(!foundUser) return res.status(401).json({ err: `Invalid Email! try again.` });

        const match = await bcrypt.compare(password, foundUser.password);
        if(!match) return res.status(401).json({ err: "Invalid password"});

        // Add jwt token
        const accessToken = jwt.sign(
            {
                user: {
                    id: foundUser._id,
                    role: foundUser.role,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '45m'}
        );

        res.status(200).json({ msg: "Login successful!", accessToken});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

module.exports = handleLogin