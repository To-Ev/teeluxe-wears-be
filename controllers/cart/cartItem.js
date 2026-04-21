const Cart = require("../../model/cart");
const Products = require("../../model/Products");

const getCart = async (userId, guestId) => {
    if(userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

const cartItem = async (req, res) => {
    const {productId, quantity, size, color, guestId, userId} = req.body;

    try {
        const product = await Products.findById(productId);
        if(!product) return res.status(404).json({ err: "Product not found" });

        // determine if the user is loggedIn or guest
        let cart = await getCart(userId, guestId);

        // if cart exist update it
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) => 
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
            );

            if(productIndex > -1) {
                // if product exist already, update the quantity
                cart.products[productIndex].quantity = quantity;
            }else {
                // add new product
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }

            // Recalculate the total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            // create a new cart for guest or user
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity
                    },
                ],
                totalPrice: product.price * (Number(quantity) || 1)
            });
            return res.status(201).json(newCart)
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    };
};

const cartContent = async (req, res) => {
    const {productId, quantity, size, color, guestId, userId} = req.body;

    try {
        
        // determine if the user is loggedIn or guest
        let cart = await getCart(userId, guestId);
        if(!cart) return res.status(404).json({ err: "Cart not found" });

        const productIndex = cart.products.findIndex(
            (p) => 
            p.productId.toString() === productId &&
            p.size === size &&
            p.color === color
        );

        if(productIndex > -1) {
            // if product exist already, update the quantity
            if(quantity > 0){
                cart.products[productIndex].quantity = quantity;
            }else {
                // add new product
                cart.products.splice(productIndex, 1); //remove product if quantity is 0
            }
            // Recalculate the total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ err: "Product not found in cart" })
        }

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    };
};
const cartContentDelete = async (req, res) => {
    const {productId, size, color, guestId, userId} = req.body;

    try {
        
        // determine if the user is loggedIn or guest
        let cart = await getCart(userId, guestId);
        if(!cart) return res.status(404).json({ err: "Cart not found" });

        const productIndex = cart.products.findIndex(
            (p) => 
            p.productId.toString() === productId &&
            p.size === size &&
            p.color === color
        );

        if(productIndex > -1) {
            cart.products.splice(productIndex, 1); 
           
            // Recalculate the total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ err: "Product not found in cart" })
        }

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    };
};
const getUserCart = async (req, res) => {
    const {userID, guestId} = req.query;

    try {
        const cart = await getCart(userId, guestId);
        if(cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ err: "Cart not found" });
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    };
};

module.exports = {cartItem, cartContent, cartContentDelete, getUserCart}