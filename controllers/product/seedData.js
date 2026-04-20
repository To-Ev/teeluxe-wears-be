const Products = require("../../model/Products");
const UserDB = require('../../model/Users');
const mockProducts = require('../../data/mockProducts');


const seedData = async (req, res) =>{

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

        res.status(201).json({ msg: "Product data seeded successfully!" });
    } catch (err) {
        console.error(`Error seeding data:`, err);
        res.sendStatus(500);
    }
}

module.exports = seedData