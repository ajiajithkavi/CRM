const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String },
  interestedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Client', ClientSchema);

