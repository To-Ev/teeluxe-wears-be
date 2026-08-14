const express = require('express');
const router = express.Router();
const { addSubscriber } = require('../controllers/subscriber/subscriberController');

// @route POST /api/subscribe
// @desc Subscribe to the newsletter
router.post('/', addSubscriber);

module.exports = router;