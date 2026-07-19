const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    size: String,
    color: String,
    quantity: {
        type: Number,
        default: 1,
        required: true,
    },
},
    {_id: false }
);

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserDB",
        required: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
    },
    shippingMethod: {
        type: String,
        enum: ["Standard", "Express", "Pickup"],
        default: "Standard"
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentDetails: {
        type: mongoose.Schema.Types.Mixed, // or String if you only store the reference
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    paymentStatus: {
        type: String,
        default: "pending",
    },
    status: {
        type: String,
        enum: ["Processing", "Shipping", "Delivered", "Cancelled"],
        default: "Processing"
    },
},
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order