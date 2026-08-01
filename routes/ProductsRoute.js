const express= require('express');
const { verifyJWT } = require('../middleware/verifyJWT');
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/ROLES_LIST");
const handleProduct = require('../controllers/product/handleProduct');
const editProduct = require('../controllers/product/editProduct');
const deleteProduct = require('../controllers/product/deleteProduct');
const handleGetProduct = require('../controllers/product/handleGetProduct');
const { addProductReview } = require('../controllers/product/addProductReview ')
const {productDetails, similarProducts, bestSeller, newArrivals} = require('../controllers/product/productDetails');

const router = express.Router();

// Admin routes
router.post("/", verifyJWT, verifyRoles(ROLES_LIST.Admin), handleProduct);
router.put("/:id", verifyJWT, verifyRoles(ROLES_LIST.Admin), editProduct);
router.delete("/:id", verifyJWT, verifyRoles(ROLES_LIST.Admin), deleteProduct);

// Public routes
router.post("/:id/reviews", verifyJWT, addProductReview);
router.get("/", handleGetProduct);

// Specific routes first
router.get("/best-seller", bestSeller);
router.get("/new-arrivals", newArrivals);
router.get("/similar/:id", similarProducts);

// Generic route last
router.get("/:id", productDetails);

module.exports = router