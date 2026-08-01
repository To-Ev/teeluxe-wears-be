const jwt = require('jsonwebtoken');
const User = require('../model/Users');


const verifyJWT = async (req, res, next) => {

    const authHeader = req.headers.Authorization || req.headers.authorization;
    
    try {
        if (!authHeader?.startsWith('Bearer')) {
            return res.status(401).json({ err: "Unauthorized! Invalid token!" });
        }

        const token = authHeader.split(" ")[1]; 

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
        req.user = await User.findById(decoded.user.id).select("-password"); //exclude password
        req.roles = decoded.user.roles;

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ err: "Token expired" });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ err: "Invalid token! Try login again." });
        }
    }
}


module.exports = { verifyJWT }