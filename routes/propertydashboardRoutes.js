const express = require('express');
const router = express.Router();

const Property = require('../models/propertyModel');
const Tenant = require('../models/tenantModel');
const RentalPayment = require('../models/rentalpaymentModel');
const MaintenanceRequest = require('../models/maintenancerequestModel');
const Report = require('../models/reportModel');
const CalendarEvent = require('../models/calenderModel');
const Vendor = require('../models/vendorsModel');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Property Dashboard' });
  });

// View all properties with details
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find().populate('tenants').populate('maintenanceRequests').populate('reports');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  View a specific property by ID
router.get('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('tenants').populate('maintenanceRequests').populate('reports');
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create rental payment for a tenant
router.post('/payment', async (req, res) => {
  try {
    const { tenantId, amount, paymentDate } = req.body;
    const rentalPayment = new RentalPayment({
      tenant: tenantId,
      amount,
      paymentDate,
      status: 'Pending',
    });
    await rentalPayment.save();
    res.status(201).json({ message: 'Rental payment created', rentalPayment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

// View maintenance requests for a property
router.get('/properties/:propertyId/maintenance', async (req, res) => {
  try {
    const maintenanceRequests = await MaintenanceRequest.find({ property: req.params.propertyId }).populate('assignedTo');
    res.json(maintenanceRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create maintenance request for a property
router.post('/maintenance', async (req, res) => {
  const { propertyId, description } = req.body;
  try {
    const maintenanceRequest = new MaintenanceRequest({
      property: propertyId,
      description,
      status: 'Open',
    });
    await maintenanceRequest.save();
    res.status(201).json({ message: 'Maintenance request created', maintenanceRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign vendor to maintenance request
router.put('/maintenance/:requestId/assign', async (req, res) => {
  try {
    const { vendorId } = req.body;
    const maintenanceRequest = await MaintenanceRequest.findByIdAndUpdate(
      req.params.requestId,
      { assignedTo: vendorId },
      { new: true }
    );
    res.json({ message: 'Vendor assigned to maintenance request', maintenanceRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// View all calendar events
router.get('/calender', async (req, res) => {
  try {
    const events = await CalendarEvent.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a calendar event
router.post('/calender', async (req, res) => {
  try {
    const event = new CalendarEvent(req.body);
    await event.save();
    res.status(201).json({ message: 'Calendar event created', event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
