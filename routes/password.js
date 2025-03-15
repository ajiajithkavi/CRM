const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Adjust path as per your project
const nodemailer = require('nodemailer');
require('dotenv').config();


// 📧 Nodemailer setup (Gmail Example)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // replace with your SMTP server
    port: 465,                // common SMTP port
    secure: true,            // false for port 587, true for port 465
    auth: {
        user: process.env.EMAIL_USER, // your email user
        pass: process.env.EMAIL_PASS  // your email password
    },
    tls: {
        rejectUnauthorized: false // ✅ Allow self-signed certificates
    }
});

router.post('/forgot-password', async (req, res) => {
        const { email } = req.body;
    
        try {
            // ✅ Check if user exists
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ msg: 'User not found' });
    
            // ✅ Generate Reset Token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    
            // ✅ Save token & expiry in user document
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes expiry
            await user.save();
    
            // ✅ Send only the token via email
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Password Reset Token',
                html: `
                    <h3>Password Reset Request</h3>
                    <p>Here is your password reset token:</p>
                    <p><b>${token}</b></p>
                    <p>This token is valid for 15 minutes.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                `
            });
    
            res.json({ msg: 'Reset token sent to your email.' });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Server error' });
        }
});

// ✅ Reset Password Route
router.post('/reset-password', async (req, res) => {
    try {
        console.log('Request Body:', req.body); 

        const { token, newPassword } = req.body;
        const secretKey = process.env.JWT_SECRET; // Load from env

        if (!token) return res.status(400).json("Token is required");
        if (!newPassword) return res.status(400).json("New password is required");

        let decoded;
        try {
            decoded = jwt.verify(token, secretKey); // Correct secret key used here
        } catch (err) {
            console.error('Token verification error:', err);
            return res.status(401).json("Invalid or expired token");
        }

        const userId = decoded.id;
        console.log('Decoded User ID:', userId);

        const user = await User.findById(userId);
        if (!user) return res.status(404).json("User not found");

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json("Password updated successfully");
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json("Internal server error");
    }
});


module.exports = router;
