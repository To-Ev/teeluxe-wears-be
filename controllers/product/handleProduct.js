const Products = require('../../model/Products');
const Subscriber = require('../../model/Subscriber');
const { sendNewProductEmail } = require('../subscriber/sendNewProductEmail');
const emailQueue = require("../subscriber/emailQueue")

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

        // Notify subscribers in background (don’t block response)
        try {
            const subscribers = await Subscriber.find({});
            await Promise.all(
                subscribers.map(sub => emailQueue.add({ subscriber: sub, product: newProduct }))
            );
        } catch (notifyErr) {
            console.error("Failed to enqueue emails:", notifyErr);
        }

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

module.exports = handleProduct