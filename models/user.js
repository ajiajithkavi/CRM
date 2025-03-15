const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: String,
    email: { type: String, unique: true },
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});
module.exports = mongoose.model('User', UserSchema);