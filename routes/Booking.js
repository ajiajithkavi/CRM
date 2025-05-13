const express = require('express');
const router = express.Router();
const Booking = require('../models/bookings');


router.post('/book', async (req, res) => {
    try {
        const { firstName, lastName, country, city, streetAddress,zipCode, email, phone, note } = req.body;

        // Validation
        if (!firstName || !lastName || !country  || !city || !streetAddress || !zipCode || !email || !phone) {
            return res.status(400).json({ message: 'All required fields must be filled!' });
        };

        //Validaation phone number 
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) 
            {
            return res.status(400).json({ message: "Invalid credentials" });
        };
 

        const newBooking = new Booking({ firstName, lastName, country, streetAddress, city, zipCode, email, phone, note });
        await newBooking.save();

        res.status(201).json({ message: 'Booking  successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    };
});


router.get('/list', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json(bookings);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//edit
router.put('/book/:id', async( req, res) => {
    try {
        const Id = req.params.id;
        const updatedata = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(Id, updatedata, { new: true});

        if(!updatedBooking ) {
            return res.status(404).json({ message: "Booking not found!"});
        }

        res.status(200).json({ message: "Booking updated successfully!", data: updatedBooking});
        }catch(error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error"});
        }
});


//delete

router.delete('/book/:id', async (req, res) => {
    try{
        const Id = req.params.id;

        const deletedBooking = await Booking.findByIdAndDelete(Id);

        if(!deletedBooking) {
            return res.status(404).json({ message: "Booking not found!"});

        }
        res.status(200).json({ message: "Booking deleted successfully!"});
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error"});
    }
});

module.exports = router;
