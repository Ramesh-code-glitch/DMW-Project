const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Ensure this path is correct
const Joi = require('joi');

// Validation schema
const schema = Joi.object({
    personalDetails: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
        address: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        pincode: Joi.string().required(),
        country: Joi.string().required(),
        additionalInfo: Joi.string().allow(''),
    }).required(),
    vehicle: Joi.object({
        make: Joi.string().required(),
        model: Joi.string().required(),
        year: Joi.string().required(),
    }).required(),
    selectedParts: Joi.array().items(Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
    })).required(),
});

// POST route for saving purchase details
router.post('/', async (req, res) => {
    console.log('Received request body:', req.body);

    // Validate request body
    const { error } = schema.validate(req.body);
    if (error) {
        console.error('Validation error:', error.details);
        return res.status(400).json({ message: 'Validation failed', details: error.details });
    }

    const {
        name,
        email,
        phone,
        address,
        state,
        city,
        pincode,
        country,
        additionalInfo,
    } = req.body.personalDetails;

    const { make, model, year } = req.body.vehicle;
    const selectedParts = req.body.selectedParts;

    try {
        // Check for existing order with the same email
        const existingOrder = await Order.findOne({ 'personalDetails.email': email });
        if (existingOrder) {
            return res.status(400).json({ message: 'An order with this email already exists.' });
        }

        // Create new order instance
        const newPurchase = new Order({
            personalDetails: {
                name,
                email,
                phone,
                address,
                state,
                city,
                pincode,
                country,
                additionalInfo,
            },
            vehicle: {
                make,
                model,
                year,
            },
            selectedParts: selectedParts.map(part => ({
                id: part.id,
                name: part.name,
            })),
        });

        console.log('New Purchase:', newPurchase);

        // Save the purchase to the database
        await newPurchase.save();

        console.log('Purchase saved successfully');
        return res.status(201).json({ message: 'Purchase saved successfully!', purchase: newPurchase });
    } catch (error) {
        console.error('Error saving purchase:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation failed', errors: error.errors });
        }

        return res.status(500).json({ message: 'Error saving purchase data', error: error.message });
    }
});

module.exports = router;
