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

// Get broker by ID

router.get('/:id', async (req, res) => {
  try {
    const broker = await Broker.findById(req.params.id);
    if (!broker) return res.status(404).json({ error: 'Broker not found'});
    res.json(broker);
  }catch (err) {
    res.status(500).json({ error: err.message});
  }
});

// update broker

router.put('/:id', async (req, res) => {
  try{
    const broker = await Broker.findByIdAndUpdate(req.params.id, req.body);
    if (!broker) return res. status(404).json({ error: 'brker not found'});
    res.json({ message: 'broker updated', broker});
  }catch (err) {
    res.status(500).json({ error: err.message});
  }
});

//Delete broker

router.delete('/:id', async (req, res) => {
  try {
    const broker = await Broker.findByIdAndDelete(req.params.id);
    if (!broker) return res.status(404).json({error: 'broker not found'});
    res.json({message: 'broker deleted successfully'});
  }catch (err) {
    res.status(500).json({ error: err.message});
  }
});

// Get all properties for a specific broker

router.get('/:id/properties', async (req, res) => {
  try {
    const broker = await Broker.findById(req.params.id).populate('properties');
    if (!broker) return res.status(404).json({ error: 'broker not found'});
    res.json(broker.properties);
  }catch (err) {
    res.status(500).json({ error: err.message});
  }
});

module.exports = router;
