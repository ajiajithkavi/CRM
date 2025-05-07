const express = require('express');
const router = express.Router();

const Builder = require('../models/propertyModel'); 
const User = require('../models/user');
const Report = require('../models/reportModel');
const Client = require('../models/clientModel');
const CalendarEvent = require('../models/calenderModel'); 
const mongoose = require('mongoose');


router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to User Dashboard' });
  });


router.get('/properties', async (req, res) => {
  try {
    const builders = await Builder.find();
    const properties = [];

    builders.forEach(builder => {
      builder.projects.forEach(project => {
        if (project.type === 'Apartment' || project.type === 'Commercial') {
          project.phases.forEach(phase => {
            phase.floors.forEach(floor => {
              floor.houses.forEach(house => {
                properties.push({
                  builder: builder.name,
                  project: project.name,
                  location: project.location,
                  type: house.type,
                  name: house.name,
                  price: house.price,
                  areaSqFt: house.areaSqFt,
                  photos: house.photos,
                  videos: house.videos,
                  description: house.description
                });
              });
            });
          });
        } else if (project.type === 'Villa') {
          project.villas.forEach(villa => {
            villa.houses.forEach(house => {
              properties.push({
                builder: builder.name,
                project: project.name,
                location: project.location,
                type: house.type,
                name: house.name,
                price: house.price,
                areaSqFt: house.areaSqFt,
                photos: house.photos,
                videos: house.videos,
                description: house.description
              });
            });
          });
        }
      });
    });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Saved Properties
router.post('/wishlist/save/:userId', async (req, res) => {
  const { propertyId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { savedProperties: propertyId } },
      { new: true }
    );
    res.json({ message: 'Property saved to wishlist', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/wishlist/remove/:userId', async (req, res) => {
  const { propertyId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { savedProperties: propertyId } },
      { new: true }
    );
    res.json({ message: 'Property removed from wishlist', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User Inquiries (Reports)
router.get('/reports/:leadId', async (req, res) => {
  try {
    const reports = await Report.find({ lead: req.params.leadId });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// List of Clients
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find().populate('interestedProperties');
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  Calendar Events
router.get('/calender', async (req, res) => {
  try {
    const events = await CalendarEvent.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
