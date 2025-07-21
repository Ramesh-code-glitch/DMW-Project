// src/routes/business.js
const express = require('express');
const multer = require('multer');
const BusinessDetails = require('../models/BusinessDetails');
const router = express.Router();

// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'panCardImage') {
            cb(null, 'uploads/pan-images'); // Specify directory for PAN images
        } else if (file.fieldname === 'gstImage') {
            cb(null, 'uploads/gst-images'); // Specify directory for GST images
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename file to avoid collisions
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Route to add business details
router.post('/add-business-details', upload.fields([
    { name: 'panCardImage', maxCount: 1 },
    { name: 'gstImage', maxCount: 1 }
]), async (req, res) => {
    // Extract data from the request body
    const { businessName, address, country, state, city, panno, gstno, location, whatsappNumber } = req.body;

    console.log('Received data:', req.body); // Log the incoming data

    // Validate required fields
    if (!businessName || !address || !country || !state || !city || !panno || !gstno || !location || !whatsappNumber) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Validate if both images are provided
    if (!req.files.panCardImage || !req.files.gstImage) {
        return res.status(400).json({ success: false, message: 'Please upload both PAN and GST images.' });
    }

    try {
        // Access the uploaded file paths
        const panImagePath = req.files.panCardImage[0].path;
        const gstImagePath = req.files.gstImage[0].path;

        // Create a new business details document
        const newBusinessDetails = new BusinessDetails({
            businessName,
            address,
            country,
            state,
            city,
            panno,
            gstno,
            location,
            whatsappNumber, // Use the correct field name
            panImage: panImagePath,
            gstImage: gstImagePath
        });

        // Save the new business details
        const savedDetails = await newBusinessDetails.save();

        return res.status(201).json({
            success: true,
            message: 'Business details added successfully!',
            data: savedDetails
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ success: false, message: 'Failed to process request.', error: error.message });
    }
});

module.exports = router;
