const UserDB = require("../../model/Users");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) =>{
    const {name, email, password} = req.body;

    try {
        if(!name || !email || !password) return res.status(400).json({ err: "Enter email and password" })
        // Registration Logic 
        const conflict = await UserDB.findOne({ email }).exec();

        if(conflict) return res.status(409).json({ err: "User already exists!" });

        // Hash the password 
        const hashedPwd = await bcrypt.hash(password, 10);

        // create new user in database
        const newUser = await UserDB.create({
            name: name,
            email: email,
            password: hashedPwd,
        });

        // sign and return jwt token with user 
        const accessToken = jwt.sign(
            {
                user: {
                    id: newUser._id,
                    role: newUser.role,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '45m'}
        );

        // Sanitize user object before sending
        const safeUser = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        };

        res.status(201).json({ msg: `New user ${newUser.name} created successfully!`, token: accessToken, user: safeUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "server error" });
    }
}

module.exports = handleRegister