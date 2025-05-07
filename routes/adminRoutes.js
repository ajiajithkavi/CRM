const express = require('express');
const router = express.Router();
const Property = require('../models/propertyModel');
const Lead = require('../models/lead.model');
const Vendor = require('../models/vendorsModel');
const Report = require('../models/reportModel');
const Broker = require('../models/brokerModel');
const Client = require('../models/clientModel');

router.get('/dashboard', (req, res) => {
    res.status(200).json({ message: 'Welcome to Admin Dashboard' });
  });

router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/leads', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/vendors', async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/brokers', async (req, res) => {
  try {
    const brokers = await Broker.find();
    res.json(brokers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
