const mongoose = require('mongoose');
const CarPart = require('./src/models/CarPart'); // Adjust path if necessary

// Define the data you want to insert
const partsData = [
  { make: 'TATA', model: 'SAFARI', year: '2011', availability: true },
  { make: 'HONDA', model: 'MOBILIO', year: '2014', availability: true },
  { make: 'SUZUKI', model: 'SWIFT', year: '2018', availability: true },
  { make: 'TOYOTA', model: 'INNOVA', year: '2020', availability: false },
  { make: 'MAHINDRA', model: 'BOLERO', year: '2019', availability: true }
];

// Your seeding logic here


// Seed function to insert the data
const seedDatabase = async () => {
  try {
    await CarPart.insertMany(partsData);
    console.log('Data seeded successfully!');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

module.exports = seedDatabase;
