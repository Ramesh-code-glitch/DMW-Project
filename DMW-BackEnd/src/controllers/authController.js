const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage }).single('profileImage');

// Function to check if password is medium strong
const mediumPassword = (password) => {
  // Updated regex for medium strength password validation
  const regex = /^(?=.*[a-z]).{8,}$/; // At least 8 characters, with at least one lowercase letter
  return regex.test(password);
};

// Register new user
exports.registerUser = async (req, res) => {
  // Handle image upload
  upload(req, res, async (err) => {
    if (err) {
      console.error('Image upload error:', err);
      return res.status(400).json({ errors: [{ msg: 'Image upload failed' }] });
    }

    const { name, username, email, phone, altPhone, password, confirmPassword } = req.body;

    // Validate request body
    if (!name || !username || !email || !password || !confirmPassword) {
      return res.status(400).json({ errors: [{ msg: 'Please fill all fields' }] });
    }

    // Trim inputs to avoid leading/trailing spaces
    const trimmedName = name.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase(); // Convert email to lowercase

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({ errors: [{ msg: 'Passwords do not match' }] });
    }

    // Validate password strength (in plain text)
    if (!mediumPassword(password)) {
      return res.status(400).json({ errors: [{ msg: 'Password must be at least 8 characters long and contain at least one lowercase letter.' }] });
    }

    // Validate phone numbers if necessary
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ errors: [{ msg: 'Invalid phone number' }] });
    }
    if (altPhone && !phoneRegex.test(altPhone)) {
      return res.status(400).json({ errors: [{ msg: 'Invalid alternative phone number' }] });
    }

    try {
      // Check if user exists
      let user = await User.findOne({ email: trimmedEmail });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save user
      user = new User({
        name: trimmedName,
        username: trimmedUsername,
        email: trimmedEmail,
        phone,
        altPhone,
        password: hashedPassword,
        profileImage: req.file ? req.file.path : null, // Save profile image path
      });

      await user.save();
      res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error('Server error during registration:', err);
      res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
  });
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ errors: [{ msg: 'Please provide email and password' }] });
  }

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() }); // Email trimmed and lowercased
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name }, expiresIn: '1h' });
  } catch (err) {
    console.error('Server error during login:', err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
