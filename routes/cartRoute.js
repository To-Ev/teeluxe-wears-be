const express= require('express');
const { verifyJWT } = require("../middleware/verifyJWT");
const {cartItem, cartContent, cartContentDelete, getUserCart} = require('../controllers/cart/cartItem');

const router = express.Router();

// post api/cart
// add a product to a cart for a guest or loggedIn user
// access public
router.post("/", cartItem);

// update a product quantity in a cart for a guest or loggedIn user
// access public
router.put("/", cartContent);

// delete a product in a cart for a guest or loggedIn user
// access public
router.delete("/", cartContentDelete);

// get a user a cart for a guest or loggedIn user
// access public
router.get("/", getUserCart);

module.exports = router