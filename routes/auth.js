const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
require('dotenv').config();

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        //  Validate email and password
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in the database
        user = new User({ email, password: hashedPassword });
        await user.save();

        // Send response after successful registration
        res.status(201).json({ msg: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Send response
        res.status(200).json({ msg: "Login successful", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});

// Google Authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/' }));

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});


// Get All Users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching users" });
    }
});

module.exports = router;
