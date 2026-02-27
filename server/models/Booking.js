const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
    flightName: { type: String, required: true },
    flightId: { type: String },
    departure: { type: String },
    destination: { type: String },
    email: { type: String },
    mobile: { type: String },
    seats: { type: String }, // Your schema has this as String
    passengers: [{
        name: { type: String },
        age: { type: Number }
    }],
    totalPrice: { type: Number },
    bookingDate: { type: Date, default: Date.now },
    journeyDate: { type: Date },
    journeyTime: { type: String },
    seatClass: { type: String },
    bookingStatus: { type: String, default: 'confirmed' }
});

module.exports = mongoose.model('Booking', bookingSchema);