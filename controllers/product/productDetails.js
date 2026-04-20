const Products = require("../../model/Products");

// Product details
const productDetails = async (req, res) => {
    try {
        const details = await Products.findById(req.params.id);
        if(details) {
            res.status(200).json(details);
        } else {
            res.status(400).json({ err: "Item not found"})
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

// Similar products
const similarProducts = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Products.findById(id);

        if(!product) {
            return res.status(404).json({ err: "Product not found" });
        };

        const similarProducts = await Products.find({
            _id: { $ne: id }, //exclude the current product ID
            section: product.section,
            category: product.category,
        }).limit(4);

        res.json(similarProducts);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

// Fetches the products with the highest rating
const bestSeller = async (req, res) => {

    try{
        const bestSeller = await Products.findOne().sort({ rating: -1 });
        if(bestSeller) {
            res.json(bestSeller);
        } else {
            res.status(400).json({ msg: "No best seller found"})
        }
    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
};

// New arrivals
const newArrivals = async (req, res) => {
    try {
        // fetch latest 8 products
        const newArrivals = await Products.find().sort({ createdAt: -1 }).limit(8);

        res.json(newArrivals);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

module.exports = {productDetails, similarProducts, bestSeller, newArrivals}