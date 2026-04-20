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
            query.collections = collection;
        }

        if(category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        }

        if(material) {
            query.material = { $in: material.split(",")};
        }

        if(size) {
            query.sizes = { $in: size.split(",")};
        }

        if(color) {
            query.colors = { $in: [color] };
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
        if(sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 };
                    break;
                case "priceDesc":
                    sort = { price: -1 };
                    break;
                case "popularity":
                    sort = { rating: -1 };
                    break;
                default:
                    break;
            }
        }

        let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);

        res.status(200).json(products)
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
   
}

module.exports = handleGetProduct