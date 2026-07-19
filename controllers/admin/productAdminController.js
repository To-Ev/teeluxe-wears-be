const Products = require("../../model/Products");

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Error fetching products" });
    }
};

module.exports = { getAllProducts };