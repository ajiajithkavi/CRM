const express = require('express');
const router = express.Router();
const Event = require('../models/calenderModel');

// Create calendar event
router.post('/', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json({ message: 'Event created', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 
