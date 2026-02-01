const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, // Prevents duplicate emails
        trim: true,
        lowercase: true 
    },
    mobile: { 
        type: String, 
        required: true, 
        unique: true, // Prevents duplicate mobile numbers
        trim: true 
    },
    gender: { type: String, required: true },
    status: { type: String, required: true },
    location: { type: String, required: true },
    profile: { type: String } 
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);