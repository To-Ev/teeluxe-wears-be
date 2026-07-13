const Checkout = require('../../model/Checkout');
const Cart = require('../../model/Cart');
const Products = require('../../model/Products');
const Order = require('../../model/Order');

const checkout = async (req, res) => {
    const { 
        checkoutItems, 
        shippingAddress, 
        paymentMethod, 
        shippingMethod,
        totalPrice 
    } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ err: "No items in checkout" })
    }

    try {
        //create a new checkout session
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            shippingMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });
        res.status(201).json(newCheckout);
    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
};

const markCheckout = async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout) {
            return res.status(404).json({ err: "Checkout not found"})
        }

        if(paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails =  paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        } else {
            res.status(400).json({ err: "Invalid Payment Status"});
        }
    } catch (error) {
        console.error(err);
        res.sendStatus(500);
    }
};

const finalizeCheckout = async (req, res) => {

    try{
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout) {
            return res.status(404).json({ err: "Checkout not found" });
        }

        if(checkout.isPaid && !checkout.isFinalized) {
            // Create final order based on the checkout details
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                shippingMethod: checkout.shippingMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentMethod: checkout.paymentMethod,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            // Mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            // Delete the cart associated with the user
            await Cart.findOneAndDelete({ user: checkout.user });
            res.status(201).json(finalOrder);

        } else if(checkout.isFinalized) {
            res.status(400).json({ err: "Checkout already finalized" });
        } else {
            res.status(400).json({ err: "Checkout is not paid" })
        };

    }catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
}

module.exports = { checkout, markCheckout, finalizeCheckout };