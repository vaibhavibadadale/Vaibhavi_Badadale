const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Simplified for development
app.use(express.json()); // CRITICAL: This allows reading the req.body from React

// Database Configuration
// Defaulting to "bits_and_volts" database name
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bits_and_volts";

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected: ", mongoose.connection.name))
    .catch(err => {
        console.error("❌ MongoDB Connection Error: ", err.message);
    });

// Health check route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});