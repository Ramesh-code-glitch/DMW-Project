const mongoose = require('mongoose');

// Define schema for storing selected car part details
const carPartSelectionSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  selectedParts: [
    {
      partId: { type: String, required: true },
      partName: { type: String, required: true },
    },
  ],
  additionalInfo: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

// Create a model based on the schema
const CarPartSelection = mongoose.model('CarPartSelection', carPartSelectionSchema);

module.exports = CarPartSelection;
