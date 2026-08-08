const Product = require('../../model/Products');

const handleGetProduct = async (req, res) => {

    try {
        const {
            collection, 
            sortBy,
            size,
            section,
            minPrice,
            maxPrice,
            search,
            color,
            category,
            material,
            brand,
            limit
        } = req.query;

        let query = {};

        // filter logic
        if(collection && collection.toLocaleLowerCase() !== "all") {
            query.collection = collection;
        }

        if(category && category.toLocaleLowerCase() !== "all") {
            query.category = { $in: category.split(",") };
        }

        if(material) {
            query.material = { $in: material.split(",")};
        }

        if(size) {
            query.sizes = { $in: size.split(",")};
        }

        if(color) {
            query.color = { $in: [color] };
        }

        if(brand) {
            query.brand = { $in: brand.split(",")};
        }

        if(section) {
            query.section = section;
        }

        if(minPrice || maxPrice) {
            query.price = {};
            if(minPrice) query.price.$gte = Number(minPrice);
            if(maxPrice) query.price.$lte = Number(maxPrice);
        }

        if(search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        }

        // sort logic
        let sort = {};
        if (sortBy) {
            switch (sortBy) {
            case "priceAsc":
            sort = { price: 1 }; // lowest price
            break;
            case "priceDesc":
            sort = { price: -1 }; // highest price
            break;
            case "popularity":
            sort = { rating: -1 }; // highest rating
            break;
            default:
            sort = { createdAt: -1 }; // fallback
            break;
        }
        } else {
            // no sortBy → just latest first
            sort = { createdAt: -1 };
        }

        const products = await Product.find(query)
        .sort(sort)
        .limit(Number(limit) || 0);

        res.status(200).json(products)
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
   
}

module.exports = handleGetProduct