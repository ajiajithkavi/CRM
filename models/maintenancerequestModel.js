const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Completed'], default: 'Open' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  createdAt: { type: Date, default: Date.now },
});

const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
module.exports = MaintenanceRequest;
