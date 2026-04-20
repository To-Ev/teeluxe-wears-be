const jwt = require('jsonwebtoken');
const User = require('../model/Users');


const verifyJWT = async (req, res, next) => {

    const authHeader = req.headers.Authorization || req.headers.authorization;
    
    try {
        if(!authHeader?.startsWith('Bearer')) return res.status(401).json({ err: "Unauthorized! Invalid token!" });

        const token = authHeader.split(" ")[1]; 

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
        );
        req.user = await User.findById(decoded.user.id).select("-password"); //exclude password

        next();
    } catch (err) {
        console.error('Failed to get token:', err);
        res.sendStatus(400);
    }

};

// Middleware for checking if user is an Admin
const Admin = (req, res, next) => {
    if(req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ err: "Not authorized as an admin!" });
    }
};

module.exports = { verifyJWT, Admin }