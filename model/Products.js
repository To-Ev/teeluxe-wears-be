const mongoose = require('mongoose')
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDB",
      required: true,
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

const userSchema = new Schema(
    {
        name: {
        type: String,
        required: true,
        trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            minLength: 6,
        },
        discountPrice: {
            type: Number,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        sku: {
            type: String,
            unique: true,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
        },
        sizes: {
            type: [String],
            required: true,
        },
        colors: {
            type: [String],
            required: true,
        },
        collections: {
            type: String,
            required: true,
        },
        material: {
            type: String,
        },
        section: {
            type: String,
            enum: ["Accessories", "Clothing"]
        },
        images: [
            {
                url: {
                    type: String,
                    required: true,
                },
                altText: {
                    type: String,
                }
            },
        ],
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            default: 0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        reviews: [reviewSchema],
        tags: [String],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserDB",
            required: true,
        },
        metaTitle: {
            type: String,
        },
        metaDescription: {
            type: String,
        },
        metaKeywords: {
            type: String,
        },
        dimensions: {
            length: Number,
            width: Number,
            height: Number,
        },
        weight: Number,
    },
    {timestamps: true}
);

const Products = mongoose.model("Products", userSchema)

module.exports = Products