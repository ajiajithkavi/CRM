const mongoose = require('mongoose');

const BrokerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  commissionRate: { type: Number, required: true },
});

module.exports = mongoose.model('Broker', BrokerSchema);

