const express = require('express');
const router = express.Router();
const Builder = require('../models/property.model');

router.post('/builders', async (req, res) => {
    const builder = new Builder({
      name: req.body.name,
      contactInfo: req.body.contactInfo,
      phone: req.body.phone,
      projects: req.body.projects
    });
  
    try {
      const newBuilder = await builder.save();
      res.status(201).json(newBuilder);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

// Get all builders
router.get('/builders', async (req, res) => {
  try {
    const builders = await Builder.find();
    res.json(builders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific builder
router.get('/builders/:builderId', async (req, res) => {
  try {
    const builder = await Builder.findById(req.params.builderId);
    if (!builder) return res.status(404).json({ error: 'Builder not found' });
    res.json(builder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all projects of a builder
router.get('/builders/:builderId/projects', async (req, res) => {
  try {
    const builder = await Builder.findById(req.params.builderId);
    if (!builder) return res.status(404).json({ error: 'Builder not found' });
    res.json(builder.projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single project by index
router.get('/builders/:builderId/projects/:projectIndex', async (req, res) => {
  try {
    const builder = await Builder.findById(req.params.builderId);
    const project = builder?.projects[req.params.projectIndex];
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all phases in a project
router.get('/builders/:builderId/projects/:projectIndex/phases', async (req, res) => {
  try {
    const builder = await Builder.findById(req.params.builderId);
    const project = builder?.projects[req.params.projectIndex];
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project.phases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all floors in a phase
router.get('/builders/:builderId/projects/:projectIndex/phases/:phaseIndex/floors', async (req, res) => {
  try {
    const builder = await Builder.findById(req.params.builderId);
    const phase = builder?.projects[req.params.projectIndex]?.phases[req.params.phaseIndex];
    if (!phase) return res.status(404).json({ error: 'Phase not found' });
    res.json(phase.floors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all houses in a floor
router.get('/builders/:builderId/projects/:projectIndex/phases/:phaseIndex/floors/:floorIndex/houses', async (req, res) => {
  try {
    const builder = await Builder.findById(req.params.builderId);
    const floor = builder?.projects[req.params.projectIndex]
      ?.phases[req.params.phaseIndex]
      ?.floors[req.params.floorIndex];

    if (!floor) return res.status(404).json({ error: 'Floor not found' });
    res.json(floor.houses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all villas in a project
router.get('/builders/:builderId/projects/:projectIndex/villas', async (req, res) => {
  try {
    const builder = await Builder.findById(req.params.builderId);
    const project = builder?.projects[req.params.projectIndex];
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project.villas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all houses in a villa
router.get('/builders/:builderId/projects/:projectIndex/villas/:villaIndex/houses', async (req, res) => {
  try {
    const builder = await Builder.findById(req.params.builderId);
    const villa = builder?.projects[req.params.projectIndex]?.villas[req.params.villaIndex];
    if (!villa) return res.status(404).json({ error: 'Villa not found' });
    res.json(villa.houses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
