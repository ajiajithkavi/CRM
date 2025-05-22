const mongoose = require('mongoose');

const BrokerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  location: { type: String },
  selectType: {
    type: String,
    enum: ['Internal', 'Broker', 'Agent']
  },
  ActiveListings: {type: Number, default:0},
  closedDeals: {type: Number},
  AvatarUrl: { type: String},
  commissionRate: { type: Number, required: true },
});

module.exports = mongoose.model('Broker', BrokerSchema);

