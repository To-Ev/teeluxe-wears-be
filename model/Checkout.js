const mongoose = require('mongoose');
const { Schema } = mongoose;

const checkoutItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: String,
    color: String,
    quantity: {
        type: Number,
        required: true,
    },
}, 
    { _id: false }
);

const checkoutSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserDB",
        required: true,
    },
    checkoutItems: [checkoutItemSchema],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
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
    paymentStatus: {
        type: String,
        default: "pending",
    },
    paymentDetails: {
        type: Schema.Types.Mixed, //Store payment related details(transaction ID, Paystack response)
    },
    isFinalized: {
        type: Boolean,
        default: false,
    },
    finalizedAt: {
        type: Date,
    },
},
    { timestamps: true }
)

const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = Checkout