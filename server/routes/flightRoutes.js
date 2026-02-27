const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// 1. Get All Flights
router.get('/flights', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Add a New Flight (Admin Functionality)
router.post('/add', async (req, res) => {
    try {
        const newFlight = new Flight(req.body);
        await newFlight.save();
        res.status(201).json({ message: "✅ Flight added successfully!", flight: newFlight });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. SEED DATA (Used for quick database resets)
router.get('/seed', async (req, res) => {
    try {
        await Flight.deleteMany({}); // Clear old flights

        const flightData = [
            { flightName: "Air France", flightId: "AF101", origin: "NYC", destination: "Paris", basePrice: 3200, departureTime: "18:30", arrivalTime: "07:45", totalSeats: 120 },
            { flightName: "Delta", flightId: "DL202", origin: "NYC", destination: "London", basePrice: 2800, departureTime: "16:00", arrivalTime: "04:00", totalSeats: 200 },
            { flightName: "Indigo", flightId: "IN303", origin: "Chennai", destination: "Bangalore", basePrice: 7200, departureTime: "18:40", arrivalTime: "20:00", totalSeats: 180 }
        ];
        
        await Flight.insertMany(flightData);
        res.json({ message: "✅ Database Seeded with sample flights!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;