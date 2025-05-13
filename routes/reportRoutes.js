  const express = require('express');
  const router = express.Router();
  const Report = require('../models/reportModel');
  const Lead = require('../models/lead.model');
  const Property = require('../models/propertyModel');


  // Create a new Report

  router.post('/', async (req, res) => {
    try {
      const { lead, date, details } = req.body;
      const newReport = new Report({ lead, date, details });
      await newReport.save();
      res.status(201).json({ message: 'Report created successfully', report: newReport });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


  // Get all Reports

  router.get('/', async (req, res) => {
    try {
      const reports = await Report.find().populate('lead');
      res.json(reports);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get Report by ID

  router.get('/:reportId', async (req, res) => {
    try {
      const report = await Report.findById(req.params.reportId).populate('lead');
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
      res.json(report);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  // Update a Report by ID

  router.put('/:reportId', async (req, res) => {
    try {
      const { lead, date, details } = req.body;
      const updatedReport = await Report.findByIdAndUpdate(
        req.params.reportId,
        { lead, date, details },
        { new: true }
      ).populate('lead');

      if (!updatedReport) {
        return res.status(404).json({ message: 'Report not found' });
      }

      res.json({ message: 'Report updated successfully', report: updatedReport });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


  // Delete a Report by ID

  router.delete('/:reportId', async (req, res) => {
    try {
      const deletedReport = await Report.findByIdAndDelete(req.params.reportId);
      if (!deletedReport) {
        return res.status(404).json({ message: 'Report not found' });
      }
      res.json({ message: 'Report deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  // GET Leads 
  router.get('/leads', async (req, res) => {
    try {
      const status = req.query.status || 'New';
      const leads = await Lead.find({ status }).populate('propertyInterest', 'name');
      res.json(leads);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  // GET Property Count by Status

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
