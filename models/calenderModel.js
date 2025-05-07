const mongoose = require('mongoose');

const CalenderEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CalenderEvent', CalenderEventSchema);
