const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const corsOption = require('./config/corsOption');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Apply CORS first
app.use(cors(corsOption));

// Middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome, Server is running for Teeluxe Wears');
});

// API routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/ProductsRoute'));
app.use('/api/cart', require('./routes/cartRoute'));
app.use('/api/checkout', require('./routes/checkoutRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/subscribe', require('./routes/subscribeRoute'));

// Admin routes
app.use('/api/admin/users', require('./routes/adminRoute'));
app.use('/api/admin/products', require('./routes/productAdminRoutes'));
app.use('/api/admin/orders', require('./routes/adminOrderRoutes'));

// Global error handler (ensures CORS headers on errors too)
app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.status(err.status || 500).json({ message: err.message });
});

// Start server after DB connection
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB database');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});