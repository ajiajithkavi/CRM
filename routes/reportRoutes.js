const express = require('express');
const router = express.Router();
const Lead = require('../models/lead.model');
const Property = require('../models/propertyModel');

// Get leads by status
router.get('/leads', async (req, res) => {
  try {
    const status = req.query.status || 'New';
    const leads = await Lead.find({ status }).populate('propertyInterest', 'name');
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get property count by status
router.get('/property-status', async (req, res) => {
  try {
    const report = await Property.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
