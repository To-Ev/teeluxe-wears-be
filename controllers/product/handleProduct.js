const Products = require('../../model/Products');

const handleProduct = async (req, res) => {
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

        const newProduct = await Products.create({
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
            sku,
            user: req.user._id //reference to the admin user who created it.
        });

        res.status(201).json({ msg: 'Product created successfully!', newProduct});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

module.exports = handleProduct