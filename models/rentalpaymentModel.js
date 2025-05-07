const mongoose = require('mongoose');

const rentalPaymentSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
  status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
});

const RentalPayment = mongoose.model('RentalPayment', rentalPaymentSchema);
module.exports = RentalPayment;
