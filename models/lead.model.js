const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  source: { type: String },
  status: { type: String, enum: ['New', 'In Progress', 'Converted', 'Lost'], default: 'New' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);
module.exports = Lead;