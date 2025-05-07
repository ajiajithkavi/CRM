
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  date: { type: Date, required: true },
  details: { type: String },
});

module.exports = mongoose.model('Report', ReportSchema);
