const express = require('express');
const { registerUser, login } = require('../controllers/authController'); // Ensure the path is correct
const router = express.Router();

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', login);

module.exports = router;
