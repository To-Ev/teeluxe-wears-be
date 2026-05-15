const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Controller function to handle image upload
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ err: 'No file uploaded' });
    }
    // Upload the image buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "ecommerce_uploads/products" },
        (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
        });

        // Convert the buffer to a readable stream and pipe it to Cloudinary
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    // Return the URL of the uploaded image
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ err: 'Failed to upload image' });
  }
}

module.exports = { uploadImage };