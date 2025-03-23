// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Initialize the express app
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// ✅ Allow CORS only from the frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000', // Adjust if you're hosting the frontend elsewhere
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Sample product data (could be fetched from a database in the future)
const sampleData = [
  {
    id: 1,
    title: 'Wireless Earbuds',
    price: 29.99,
    rating: 4.5,
    category: 'Electronics',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    title: 'Portable Blender',
    price: 39.99,
    rating: 4.0,
    category: 'Home Appliances',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    title: 'Yoga Mat',
    price: 19.99,
    rating: 4.8,
    category: 'Fitness',
    image: 'https://via.placeholder.com/150'
  }
];

// ✅ Route to serve product data (GET request for /products)
app.get('/products', (req, res) => {
  res.json(sampleData); // Send the sample data as JSON
});

// ✅ AI Insights route (GET request for /insights)
app.get('/insights', (req, res) => {
  // Sample insights data (can be replaced with actual AI-driven insights)
  const insights = [
    { title: 'Wireless Earbuds', popularity: 85 },
    { title: 'Portable Blender', popularity: 78 },
    { title: 'Yoga Mat', popularity: 92 },
  ];
  res.json(insights); // Send the insights data as JSON
});

// ✅ Start the backend server on port 5000 (or from environment variable)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`); // Log that the server is running
});
