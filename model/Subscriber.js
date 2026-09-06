const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriberSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribed: {
    type: Boolean,
    default: true, // new subscribers are active by default
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  unsubscribedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
