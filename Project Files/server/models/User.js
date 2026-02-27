const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    usertype: { type: String, required: true }, // e.g., 'customer' or 'admin'
    password: { type: String, required: true },
    approval: { type: String, default: 'approved' }
});

module.exports = mongoose.model('User', userSchema);