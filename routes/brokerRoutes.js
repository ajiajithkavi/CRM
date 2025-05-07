const express = require('express');
const router = express.Router();
const Broker = require('../models/brokerModel');

// Create broker
router.post('/', async (req, res) => {
  try {
    const broker = await Broker.create(req.body);
    res.json({ message: 'Broker added', broker });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all brokers
router.get('/', async (req, res) => {
  try {
    const brokers = await Broker.find();
    res.json(brokers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
