const express = require('express');
const router = express.Router();
const Builder = require('../models/builderModel'); 
const { authenticate } = require('../middleware/auth');

// Create a new builder
router.post('/', authenticate, async (req, res) => {
    try {
        const newBuilder = new Builder(req.body);
        const saved = await newBuilder.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all builders
router.get('/', async (req, res) => {
    try {
        const builders = await Builder.find(); 
        res.json(builders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get builder by ID
router.get('/:id', async (req, res) => {
    try {
        const builder = await Builder.findById(req.params.id); 
        if (!builder) return res.status(404).json({ error: 'Builder not found' });
        res.json(builder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update builder
router.put('/:id', authenticate, async (req, res) => {
    try {
        const updatedBuilder = await Builder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBuilder) return res.status(404).json({ error: 'Builder not found' });
        res.json({message: 'builder updated successfully',updatedBuilder});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete builder
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deletedBuilder = await Builder.findByIdAndDelete(req.params.id);
        if (!deletedBuilder) return res.status(404).json({ error: 'Builder not found' });
        res.json({ message: 'Builder deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
