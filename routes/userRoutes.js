const express = require('express');
const handleRegister = require('../controllers/users/handleRegister');
const handleLogin = require('../controllers/users/handleLogin');
const { verifyJWT } = require('../middleware/verifyJWT');
const seedData = require('../controllers/product/seedData');


const router = express.Router();

router.post("/register", handleRegister);

router.post("/login", handleLogin);

router.get("/profile", verifyJWT, async (req, res) => {
    res.status(200).json(req.user);
});

router.post("/seed", seedData);

module.exports = router