const express = require('express');
const router = express.Router();

const Property = require('../models/propertyModel'); 
const User = require('../models/user');
const Report = require('../models/reportModel');
const Client = require('../models/clientModel');
const CalendarEvent = require('../models/calenderModel'); 
const mongoose = require('mongoose');


router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to User Dashboard' });
  });

router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Saved Properties
router.post('/wishlist/save/:userId', async (req, res) => {
  const { propertyId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { savedProperties: propertyId } },
      { new: true }
    );
    res.json({ message: 'Property saved to wishlist', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/wishlist/remove/:userId', async (req, res) => {
  const { propertyId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { savedProperties: propertyId } },
      { new: true }
    );
    res.json({ message: 'Property removed from wishlist', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// List of Reports
router.get('/report', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// List of Clients
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find().populate('interestedProperties');
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  Calendar Events
router.get('/calender', async (req, res) => {
  try {
    const events = await CalendarEvent.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/calender', async (req, res) => {
  try {
    const event = new CalendarEvent(req.body);
    await event.save();
    res.status(201).json({ message: 'Calendar event created', event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
