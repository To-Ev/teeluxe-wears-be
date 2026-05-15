const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage } = require('../controllers/uploader/Uploader');


// multer storage configuration (using memory storage for direct upload to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), uploadImage);

module.exports = router;