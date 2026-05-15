const express = require('express');
const router = express.Router();
const { addSubscriber } = require('../controllers/subscriber/subscriberController');

// @route POST /api/subscribers
// @desc Add a new subscriber
router.post('/subscribe', addSubscriber);

module.exports = router;