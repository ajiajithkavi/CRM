const express = require('express');
const router = express.Router();
const Property = require('../models/propertyModel'); // Adjust the path as needed


const { authenticate, authorizeRoles } = require('../middleware/auth');

router.post('/properties', authenticate, authorizeRoles('admin', 'superAdmin', 'directBuilder'), async (req, res) => {
    try {
      const property = new Property(req.body);
      await property.save();
      res.status(201).json(property);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);


router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('tenants')
      .populate('maintenanceRequests')
      .populate('reports');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('tenants')
      .populate('maintenanceRequests')
      .populate('reports');

    if (!property) return res.status(404).json({ message: 'Property not found' });

    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/properties/:id', authenticate, authorizeRoles('admin', 'superAdmin', 'directBuilder'), async (req, res) => {
    try {
      const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!property) return res.status(404).json({ message: 'Property not found' });

      res.json(property);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.delete('/properties/:id',authenticate, authorizeRoles('admin', 'superAdmin'),async (req, res) => {
    try {
      const property = await Property.findByIdAndDelete(req.params.id);

      if (!property) return res.status(404).json({ message: 'Property not found' });

      res.json({ message: 'Property deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
