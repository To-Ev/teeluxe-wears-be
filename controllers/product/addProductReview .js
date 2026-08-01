const Products = require("../../model/Products");

const addProductReview = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Products.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ err: "Product not found" });
  }

  // Optional: prevent duplicate reviews by same user
  const alreadyReviewed = product.reviews?.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) {
    return res.status(400).json({ err: "Product already reviewed" });
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json(product);
};

module.exports = { addProductReview };
