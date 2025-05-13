const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    googleId: String,
    email: { type: String, unique: true },
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    savedProperties: [{ type: Schema.Types.ObjectId, ref: 'Property' }]
});
module.exports = mongoose.model('User', UserSchema);