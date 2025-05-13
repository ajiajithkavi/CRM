const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Apartment', 'Villa', 'Plot'], required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['Available', 'Sold', 'Booked'], default: 'Available' },
  price: {
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' }
  },
  floor: { type: String },
  description: { type: String },
  photos: [String],
  videos: [String],
  features: [String],
  tenants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant'
  }],
  maintenanceRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Maintenance'
  }],
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Property || mongoose.model('Property', propertySchema);
