const express = require('express');
const router = express.Router();
const Tenant = require('../models/tenantModel');

// Create a new tenant
router.post('/', async (req, res) => {
  try {
    const tenant = new Tenant({
      name: req.body.name,
      contactInfo: req.body.contactInfo,
      rentalPayments: req.body.rentalPayments || [],
      property: req.body.property
    });

    const newTenant = await tenant.save();
    res.status(201).json(newTenant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tenants
router.get('/', async (req, res) => {
  try {
    const tenants = await Tenant.find().populate('rentalPayments').populate('property');
    res.json(tenants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific tenant by ID
router.get('/:tenantId', async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.tenantId).populate('rentalPayments').populate('property');
    if (!tenant) return res.status(404).json({ error: 'Tenant not found' });
    res.json(tenant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update tenant details
router.put('/:tenantId', async (req, res) => {
  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(
      req.params.tenantId,
      {
        name: req.body.name,
        contactInfo: req.body.contactInfo,
        rentalPayments: req.body.rentalPayments,
        property: req.body.property
      },
      { new: true }
    );

    if (!updatedTenant) return res.status(404).json({ error: 'Tenant not found' });
    res.json({ message: 'Tenant updated successfully', updatedTenant});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a tenant
router.delete('/:tenantId', async (req, res) => {
  try {
    const deletedTenant = await Tenant.findByIdAndDelete(req.params.tenantId);
    if (!deletedTenant) return res.status(404).json({ error: 'Tenant not found' });
    res.json({ message: 'Tenant deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;