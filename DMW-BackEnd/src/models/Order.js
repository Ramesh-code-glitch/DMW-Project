const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  personalDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true }, // Email field acts as a unique identifier
    phone: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true },
    additionalInfo: { type: String }
  },
  vehicle: {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
  },
  selectedParts: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
    }
  ],
  status: {
    type: String,
    default: 'Pending' // Default status is set to 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
