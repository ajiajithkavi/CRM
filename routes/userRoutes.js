const express = require('express');
const router = express.Router();
const Property = require('../models/propertyModel');
const Lead = require('../models/lead.model');
const Client = require('../models/clientModel');
const CalendarEvent = require('../models/calenderModel');
const { authenticate } = require('../middleware/auth');

router.get('/saved-properties/:clientId', async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId).populate('interestedProperties');
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client.interestedProperties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/inquire/:clientId/:propertyId', authenticate, async (req, res) => {
  const { message, status } = req.body;
  try {
    const client = await Client.findById(req.params.clientId);
    const property = await Property.findById(req.params.propertyId);
    if (!client || !property) {
      return res.status(404).json({ message: 'Client or Property not found' });
    }

    const newLead = new Lead({
      name: client.name,
      email: client.contactInfo,
      propertyInterest: property._id,
      status: status || 'New',
      message: message || '',
    });

    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/calender/:clientId', async (req, res) => {
  try {
    const events = await CalendarEvent.find({ clientId: req.params.clientId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
