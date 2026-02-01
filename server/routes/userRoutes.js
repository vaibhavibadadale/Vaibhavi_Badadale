const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { Parser } = require('json2csv');

// ADD USER
// ADD USER
router.post('/add', async (req, res) => {
    console.log("📥 Incoming Request Body:", req.body);
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        console.log("✅ User Stored:", savedUser._id);
        res.status(201).json(savedUser); 
    } catch (err) {
        console.error("❌ DB Save Error:", err.message);
        
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({ message: `${field} already exists!` });
        }
        
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation Failed: Please fill all required fields" });
        }

        res.status(400).json({ message: err.message }); 
    }
});

// GET USERS (Search & Pagination)
router.get('/users', async (req, res) => {
    const { search = "", page = 1, limit = 5 } = req.query;
    try {
        const query = {
            $or: [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        };
        const users = await User.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const count = await User.countDocuments(query);
        res.json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// VIEW SINGLE USER
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: "Invalid ID format" });
    }
});

// EDIT USER
router.put('/edit/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE USER
router.delete('/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// EXPORT CSV
router.get('/exportcsv', async (req, res) => {
    try {
        const users = await User.find({});
        const fields = ['firstName', 'lastName', 'email', 'mobile', 'gender', 'status', 'location'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(users);

        res.header('Content-Type', 'text/csv');
        res.attachment('users_data.csv');
        res.status(200).send(csv);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;