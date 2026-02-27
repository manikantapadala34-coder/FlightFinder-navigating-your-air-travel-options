const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User'); 

// 1. CREATE A BOOKING
router.post('/book', async (req, res) => {
    try {
        // Find the user making the booking using the email sent from the frontend
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            return res.status(404).json({ error: "User not found. Please ensure you are logged in." });
        }

        const newBooking = new Booking({
            ...req.body,
            user: user._id // Link the booking to the actual logged-in user
        });

        await newBooking.save();
        res.status(201).json({ message: "✅ Booking Confirmed!", booking: newBooking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET ALL BOOKINGS (For the My Bookings page)
router.get('/bookings', async (req, res) => {
    try {
        // Note: For a real app, you would filter this by the logged-in user's ID.
        // For APSCHE demo purposes, returning all bookings is usually acceptable.
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. CANCEL A TICKET (The missing piece for your red button!)
router.put('/bookings/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
        
        // Find the booking by ID and update the status
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId, 
            { bookingStatus: 'cancelled' }, 
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json({ message: "Ticket successfully cancelled", booking: updatedBooking });
        
    } catch (err) {
        console.error("Error updating booking:", err);
        res.status(500).json({ error: "Server error while cancelling ticket" });
    }
});

module.exports = router;