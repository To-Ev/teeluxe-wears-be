const express= require('express');
const {verifyJWT, Admin} = require('../middleware/verifyJWT');
const handleProduct = require('../controllers/product/handleProduct');
const editProduct = require('../controllers/product/editProduct');
const deleteProduct = require('../controllers/product/deleteProduct');
const handleGetProduct = require('../controllers/product/handleGetProduct');
const {productDetails, similarProducts, bestSeller, newArrivals} = require('../controllers/product/productDetails');

const router = express.Router();

// Admin routes
router.post("/", verifyJWT, Admin, handleProduct);
router.put("/:id", verifyJWT, Admin, editProduct);
router.delete("/:id", verifyJWT, Admin, deleteProduct);

// Public routes
router.get("/", handleGetProduct);

// Specific routes first
router.get("/best-seller", bestSeller);
router.get("/new-arrivals", newArrivals);
router.get("/similar/:id", similarProducts);

// Generic route last
router.get("/:id", productDetails);

module.exports = router