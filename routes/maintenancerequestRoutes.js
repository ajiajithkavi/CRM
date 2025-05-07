const express = require('express');
const router = express.Router();
const MaintenanceRequest = require('../models/maintenancerequestModel'); 

// Create a new maintenance request
router.post('/', async (req, res) => {
  try {
    const { property, description, assignedTo } = req.body;

    const newMaintenanceRequest = new MaintenanceRequest({
      property,
      description,
      assignedTo,
      status: 'Open', 
    });

    const savedRequest = await newMaintenanceRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all maintenance requests
router.get('/', async (req, res) => {
  try {
    const maintenanceRequests = await MaintenanceRequest.find()
      .populate('property')
      .populate('assignedTo');
    res.json(maintenanceRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific maintenance request by ID
router.get('/:requestId', async (req, res) => {
  try {
    const maintenanceRequest = await MaintenanceRequest.findById(req.params.requestId)
      .populate('property')
      .populate('assignedTo');
    
    if (!maintenanceRequest) {
      return res.status(404).json({ error: 'Maintenance request not found' });
    }

    res.json(maintenanceRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a maintenance request
router.put('/:requestId', async (req, res) => {
  try {
    const { status, assignedTo } = req.body;

    const updatedRequest = await MaintenanceRequest.findByIdAndUpdate(
      req.params.requestId,
      { status, assignedTo },
      { new: true }
    )
      .populate('property')
      .populate('assignedTo');

    if (!updatedRequest) {
      return res.status(404).json({ error: 'Maintenance request not found' });
    }

    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a maintenance request
router.delete('/:requestId', async (req, res) => {
  try {
    const deletedRequest = await MaintenanceRequest.findByIdAndDelete(req.params.requestId);

    if (!deletedRequest) {
      return res.status(404).json({ error: 'Maintenance request not found' });
    }

    res.json({ message: 'Maintenance request deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
