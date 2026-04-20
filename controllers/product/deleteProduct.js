const Products = require("../../model/Products");


const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);

        if(product) {
            await product.deleteOne();
            res.status(200).json({ err: "Product removed successfully." });
        } else {
            res.status(404).json({ err: "Product not found!" });
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = deleteProduct