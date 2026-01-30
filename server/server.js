const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
// Updated CORS to be deployment-friendly
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// 1. Database Configuration
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bits_and_volts";

// 2. Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error: ", err.message);
        process.exit(1); 
    });

// 3. Import Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// 4. Start Server
// Using process.env.PORT is required for Render/Heroku deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});