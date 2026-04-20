const Products = require("../../model/Products");

const editProduct = async (req, res) => {
    try {
        const {
            name, 
            description, 
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            section,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku
        } = req.body;

        const product = await Products.findById(req.params.id);

        // update the products
        if(product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.sizes = sizes || product.sizes;
            product.discountPrice = discountPrice || product.discountPrice;
            product.price = price || product.price;
            product.countInStock = countInStock || product.countInStock;
            product.brand = brand || product.brand;
            product.category = category || product.category;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.section = section || product.section;
            product.images = images || product.images;
            product.isFeatured = 
                isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = 
                isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;
        }

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(404).json({ err: "Product not found!" });
    }
};

module.exports = editProduct