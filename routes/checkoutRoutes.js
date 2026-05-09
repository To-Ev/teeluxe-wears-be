const express = require('express');
const { verifyJWT } = require('../middleware/verifyJWT');
const { checkout, markCheckout, finalizeCheckout } = require('../controllers/checkout/checkout');


const router = express.Router();

// @Desc create a new checkout session
// @access private
router.post("/", verifyJWT, checkout);

// @Desc Update checkout to mark as paid after successful payment
// @access private
router.put("/:id/pay", verifyJWT, markCheckout);

// @Desc Finalize checkout & convert to an order after payment confirmation
// @access private
router.post("/:id/finalize", verifyJWT, finalizeCheckout);

module.exports = router