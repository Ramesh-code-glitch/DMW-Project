const express = require('express');
const router = express.Router();
const Part = require('../models/CarPart');

// Fetch parts by make, model, and year
router.get('/search', async (req, res) => {
  try {
    // Trim input values to remove any leading or trailing whitespace
    const { make, model, year } = req.query;
    const trimmedMake = make.trim();
    const trimmedModel = model.trim();
    const trimmedYear = year.trim();

    // Validate that all necessary parameters are provided
    if (!trimmedMake || !trimmedModel || !trimmedYear) {
      return res.status(400).json({ message: 'Please provide make, model, and year' });
    }

    // Debugging output
    console.log(`Searching for parts with make: ${trimmedMake}, model: ${trimmedModel}, year: ${trimmedYear}`);

    // Find parts matching the search criteria (case-insensitive)
    const parts = await Part.find({
      make: { $regex: new RegExp(trimmedMake, 'i') },
      model: { $regex: new RegExp(trimmedModel, 'i') },
      year: String(trimmedYear) // Ensure the year is a string
    });

    // Check if any parts were found
    if (!parts || parts.length === 0) {
      return res.status(404).json({ message: 'No parts found for the given criteria' });
    }

    // Return the found parts
    res.status(200).json(parts);
  } catch (error) {
    console.error('Error fetching parts:', error);
    res.status(500).json({ message: 'Error fetching parts', error: error.message });
  }
});

module.exports = router;
