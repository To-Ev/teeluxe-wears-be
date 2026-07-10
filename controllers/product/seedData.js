const Products = require("../../model/Products");
const UserDB = require('../../model/Users');
const Order = require('../../model/Order');
const Checkout = require('../../model/Checkout');
const Subscriber = require('../../model/Subscriber');
const mockProducts = require('../../data/mockProducts');
const Cart = require("../../model/Cart");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const seedData = async (req, res) =>{

    try {

        // clear existing data
        await Products.deleteMany();
        await UserDB.deleteMany();
        await Cart.deleteMany();
        await Subscriber.deleteMany();
        await Order.deleteMany();
        await Checkout.deleteMany();

        // create new user in database
        const hashedPwd = await bcrypt.hash('pass123@7', 10);

        const createdUser = await UserDB.create({
            name: "Bukola",
            email: "bukola@example.com",
            password: hashedPwd,
            role: "admin"
        });

        // sign and return jwt token with user 
        const accessToken = jwt.sign(
            {
                user: {
                    id: createdUser._id,
                    role: createdUser.role,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '48h'}
        );

        const UserId = createdUser._id
        const createdProduct = mockProducts.map((product) =>{
            return { ...product, user: UserId }
        });

        await Products.insertMany(createdProduct);

        res.status(201).json({ msg: "Product data seeded successfully!", accessToken });
    } catch (err) {
        console.error(`Error seeding data:`, err);
        res.sendStatus(500);
    }
}

module.exports = seedData