const mongoose = require('mongoose')
const { Schema } = mongoose;


const cartItemSchema = new Schema({
    productId:{
        type: Schema.Types.ObjectId,
        ref: "Products",
        require: true
    },
    name: String,
   image: String,
   price: String,
   size: String,
   color: String,
   quantity: {
    type: Number,
    default: 1
   }
},
    {_id: false}
);

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserDB"
    },
    guestId: String,
    products: {cartItemSchema},
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart