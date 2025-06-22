const express = require('express');
const cors = require('cors');
require('dotenv').config();

const videoRoutes = require('./routes/videos');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/videos', videoRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'FileHub API is running!',
    version: '1.0.0',
    endpoints: {
      'GET /api/videos': 'Get all videos',
      'GET /api/videos/:id': 'Get video by ID',
      'GET /api/videos/search?query=': 'Search videos',
      'POST /api/videos': 'Create new video',
      'PUT /api/videos/:id': 'Update video',
      'DELETE /api/videos/:id': 'Delete video'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}`);
});

module.exports = app;
