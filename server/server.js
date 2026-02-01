const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
// Allowing all origins for simple internship projects, but with proper credentials
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Database Configuration
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bits_and_volts";

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error: ", err.message);
        // Do not process.exit(1) on Render, let the platform handle restarts
    });

// Health check route for Render
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Port setup for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});