const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  note: { type: String, default: ''},
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
