const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 1. REGISTER (Create a new user)
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "✅ User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. LOGIN (Check if user exists)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user with matching email AND password
        const user = await User.findOne({ email, password });
        
        if (user) {
            res.json({ message: "✅ Login Successful", user });
        } else {
            res.status(401).json({ error: "❌ Invalid Email or Password" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. GET ALL USERS (For Admin Dashboard and All Users page)
router.get('/users', async (req, res) => {
    try {
        // Fetch all users from the database
        // .select('-password') ensures we don't accidentally send user passwords to the frontend!
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
