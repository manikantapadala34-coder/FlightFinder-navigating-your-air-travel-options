require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

// --- 1. Import Routes ---
const flightRoutes = require('./routes/flightRoutes'); 
const bookingRoutes = require('./routes/BookingRoutes'); // ✅ New Import

const app = express();
const PORT = 5000;

// --- 2. Middleware ---
app.use(cors());
app.use(express.json());

// --- 3. Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// --- 4. Use Routes ---
// This prefix means all routes in flightRoutes will start with /api
app.use('/api', flightRoutes); 
app.use('/api', bookingRoutes); // ✅ Enable Booking Routes
app.use('/api', authRoutes);

// --- 5. Start Server ---
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});