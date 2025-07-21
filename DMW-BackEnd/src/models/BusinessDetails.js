// src/models/BusinessDetails.js
const mongoose = require('mongoose');

const businessDetailsSchema = new mongoose.Schema({
    businessName: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    panno: { type: String, required: true },
    gstno: { type: String, required: true },
    location: { type: String, required: true },
    whatsappNumber: { type: String, required: true }, // Correct field name
    panImage: { type: String, required: true },
    gstImage: { type: String, required: true }
});

module.exports = mongoose.model('BusinessDetails', businessDetailsSchema);
