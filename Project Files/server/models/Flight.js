const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightName: { type: String, required: true }, // Was 'airline'
    flightId: { type: String, required: true },   // New requirement
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    basePrice: { type: Number, required: true },  // Was 'price'
    totalSeats: { type: Number, required: true }  // Was 'seatsAvailable'
});

module.exports = mongoose.model('Flight', flightSchema);