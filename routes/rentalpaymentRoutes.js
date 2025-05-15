{
   const express = require('express');
   const router = express.Router();
   const RentalPayment = require('../models/rentalpaymentModel'); 
    
    // Create a new rental payment
    router.post('/', async (req, res) => {
      try {
        const { tenant, amount, paymentDate, status } = req.body;
    
        const newRentalPayment = new RentalPayment({
          tenant,
          amount,
          paymentDate,
          status: status || 'Pending', 
        });
    
        const savedPayment = await newRentalPayment.save();
        res.status(201).json(savedPayment);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
    
    // Get all rental payments
    router.get('/', async (req, res) => {
      try {
        const rentalPayments = await RentalPayment.find()
          .populate('tenant'); 
        res.json(rentalPayments);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
    
    // Get a specific rental payment by ID
    router.get('/:paymentId', async (req, res) => {
      try {
        const rentalPayment = await RentalPayment.findById(req.params.paymentId)
          .populate('tenant');
        
        if (!rentalPayment) {
          return res.status(404).json({ error: 'Rental payment not found' });
        }
    
        res.json(rentalPayment);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
    
    // Update a rental payment
    router.put('/:paymentId', async (req, res) => {
      try {
        const { amount, paymentDate, status } = req.body;
    
        const updatedPayment = await RentalPayment.findByIdAndUpdate(
          req.params.paymentId,
          { amount, paymentDate, status },
          { new: true }
        )
          .populate('tenant');
    
        if (!updatedPayment) {
          return res.status(404).json({ error: 'Rental payment not found' });
        }
    
        res.json({message: 'Rental payment updated successfully', updatedPayment});
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
    
    // Delete a rental payment
    router.delete('/:paymentId', async (req, res) => {
      try {
        const deletedPayment = await RentalPayment.findByIdAndDelete(req.params.paymentId);
    
        if (!deletedPayment) {
          return res.status(404).json({ error: 'Rental payment not found' });
        }
    
        res.json({ message: 'Rental payment deleted successfully' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

  module.exports = router;
}