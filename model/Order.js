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
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true,
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
        type: string,
        enum: ["Processing", "Shipping", "Delivered", "Cancelled"],
        default: "processing"
    },
},
    { timeseries: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order