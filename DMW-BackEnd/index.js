const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth'); // Correct path to auth.js
const businessRoutes = require('./src/routes/business'); // Correct path to business.js
const partRoutes = require('./src/routes/part'); // Correct path to part.js
const purchaseRoutes = require('./src/routes/purchase'); // Correct path to purchase.js
const fetchRoutes = require('./src/routes/fetch'); // Import the fetch route for saving and fetching orders
const cartRoutes = require('./src/routes/mycart'); // Your cart route file
const fs = require('fs'); // Import fs for file system operations
const path = require('path'); // Import path to handle file paths
const helmet = require('helmet'); // Security middleware (optional)
const multer = require('multer'); // Import multer for file uploads

// Load environment variables from .env file
dotenv.config();

const app = express();

// Define the path for the uploads directories
const uploadsDir = path.join(__dirname, 'uploads');
const panImagesDir = path.join(uploadsDir, 'pan-images');
const gstImagesDir = path.join(uploadsDir, 'gst-images');

// Create the directories if they don't exist
const createDirectories = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Directory created: ${dir}`);
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
};

// Create main uploads directory and subdirectories for images
createDirectories(uploadsDir);
createDirectories(panImagesDir);
createDirectories(gstImagesDir);

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'panCardImage') {
      cb(null, panImagesDir);
    } else if (file.fieldname === 'gstImage') {
      cb(null, gstImagesDir);
    } else {
      cb(new Error('Invalid field name'), null);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(helmet()); // Optional: Enhance security with helmet

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Run seed data
    const seedDatabase = require('./seed'); // Correct path to seed.js
    await seedDatabase(); // Call the seed function

    // Continue with other server logic here...
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define your routes here
app.use('/api/auth', authRoutes); // Register the auth routes with the /api/auth prefix
app.use('/api/business', businessRoutes); // Register the business routes with the /api/business prefix
app.use('/api/parts', partRoutes); // Register the part routes with the /api/parts prefix
app.use('/api/purchase', purchaseRoutes); // Register the purchase routes with the /api/purchase prefix
app.use('/api/fetch', fetchRoutes); // Assuming this is for saving orders
app.use('/api/cart', cartRoutes);
// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the DMW AutoAction API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
