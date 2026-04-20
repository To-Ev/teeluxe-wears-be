const dotenv = require('dotenv');
dotenv.config();    
const path = require('path')
const express = require('express');
const app = express();
const cors= require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db')
const PORT = 5000;

// connect to mongoDB 
connectDB();

// Custom middleware
// app.use(cors(corsOption));

// Serve the Backend/public folder (fix incorrect path)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

// middleware for json and cookie
app.use(express.json());
// app.use(cookieParser())

app.get('/', (req, res) =>{
    res.send('Welcome, Server is running for Teeluxe Wears')
});

// router routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/ProductsRoute'));
app.use('/api/cart', require('./routes/cartRoute'));

// Mongoose Connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB database');
    app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)})
});
