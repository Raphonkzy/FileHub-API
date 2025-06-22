const express = require('express');
const VideoController = require('../controllers/videoController');

const router = express.Router();

// GET /api/videos - Get all videos
router.get('/', VideoController.getAllVideos);

// GET /api/videos/search - Search videos
router.get('/search', VideoController.searchVideos);

// GET /api/videos/:id - Get video by ID
router.get('/:id', VideoController.getVideoById);

// POST /api/videos - Create new video
router.post('/', VideoController.createVideo);

// PUT /api/videos/:id - Update video
router.put('/:id', VideoController.updateVideo);

// DELETE /api/videos/:id - Delete video
router.delete('/:id', VideoController.deleteVideo);

module.exports = router;
