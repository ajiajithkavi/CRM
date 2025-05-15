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

// Update event

router.put('/:id', async (req, res) => {
  try{
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!event) return res.status(404).json({ error: 'Event not found'});
    res.json({ message: 'Event updated', event});

  } catch (err) {
    res.status(500).json({ error: err.message});
  }
});

module.exports = router; 
