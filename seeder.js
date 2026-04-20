const mongoose = require("mongoose");
const Products = require("./model/Products");
const UserDB = require('./model/Users');
const mockProducts = require('./data/mockProducts');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const seedData = async () =>{

    try {

        // clear existing data
        await Products.deleteMany();
        await UserDB.deleteMany();

        const createdUser = await UserDB.create({
            name: "Bukola",
            email: "bukola@example.com",
            password: "1234j6",
            role: "admin"
        });

        const UserId = createdUser._id
        const createdProduct = mockProducts.map((product) =>{
            return { ...product, user: UserId }
        });

        await Products.insertMany(createdProduct);

        console.log("Product data seeded successfully!");
    } catch (err) {
        console.error(`Error seeding data:`, err);
        process.exit(1);
    }
}

seedData()