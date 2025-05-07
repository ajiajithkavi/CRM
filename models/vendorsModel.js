const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serviceType: { type: String, required: true },
  contactInfo: { type: String },
  address: { type: String },
});

module.exports = mongoose.model('Vendor', VendorSchema);