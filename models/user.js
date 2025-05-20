
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  googleId: String,
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  role: {
    type: String,
    enum: ['user', 'admin', 'superAdmin', 'directBuilder'],
    required: true,
  },
  phone: String,
  companyName: String,
  isVerified: { type: Boolean, default: false },
  savedProperties: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
});


UserSchema.pre('save', function (next) {
  if (this.role === 'directBuilder' && !this.companyName) {
    next(new Error('DirectBuilder must have companyName'));
  } else {
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);
