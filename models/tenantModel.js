const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  rentalPayments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RentalPayment' }],
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
});

const Tenant = mongoose.model('Tenant', tenantSchema);
module.exports = Tenant;
