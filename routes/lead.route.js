const express = require('express');
const router = express.Router();
const Lead = require('../models/lead.model');
const { authenticate } = require('../middleware/auth');

// Create a new lead
router.post('/leads', authenticate, async (req, res) => {
  const { name, email, phone, status, source } = req.body;
  const newLead = new Lead({ name, email, phone, status, source });

  try {
    const lead = await newLead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all leads
router.get('/leads', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific lead by ID
router.get('/leads/:leadId', async (req, res) => {
    try {
      const lead = await Lead.findById(req.params.leadId);
      if (!lead) return res.status(404).json({ error: 'Lead not found' });
      res.json(lead);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Update a lead's information
  router.put('/leads/:leadId', authenticate, async (req, res) => {
    try {
      const updatedLead = await Lead.findByIdAndUpdate(req.params.leadId, req.body, { new: true });
      if (!updatedLead) return res.status(404).json({ error: 'Lead not found' });
      res.json(updatedLead);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Delete a lead
  router.delete('/leads/:leadId', authenticate, async (req,res) => {
    try{
        const deletedLead = await Lead.findByIdAndDelete(req.params.leadId);
        if(!deletedLead) return res.status(404).json({ error: 'Lead not found'});
        res.json({ message: 'Lead deleted successfully'});

    } catch(err){
        res.status(500).json({ error: err.message});
    }
  })

  module.exports = router;