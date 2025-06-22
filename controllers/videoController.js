const pool = require('../config/database');

class VideoController {
  // Get all videos
  static async getAllVideos(req, res) {
    try {
      const result = await pool.query('SELECT * FROM videos ORDER BY id DESC');
      res.status(200).json({
        success: true,
        data: result.rows,
        count: result.rows.length
      });
    } catch (error) {
      console.error('Error fetching videos:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Get video by ID
  static async getVideoById(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM videos WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Video not found'
        });
      }

      res.status(200).json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error fetching video:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
  // Create new video
  static async createVideo(req, res) {
    try {
      const { video_url, title } = req.body;

      if (!video_url) {
        return res.status(400).json({
          success: false,
          error: 'video_url is required'
        });
      }

      const result = await pool.query(
        'INSERT INTO videos (video_url, title) VALUES ($1, $2) RETURNING *',
        [video_url, title || null]
      );

      res.status(201).json({
        success: true,
        data: result.rows[0],
        message: 'Video created successfully'
      });
    } catch (error) {
      console.error('Error creating video:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
  // Update video
  static async updateVideo(req, res) {
    try {
      const { id } = req.params;
      const { video_url, title } = req.body;

      if (!video_url) {
        return res.status(400).json({
          success: false,
          error: 'video_url is required'
        });
      }

      const result = await pool.query(
        'UPDATE videos SET video_url = $1, title = $2 WHERE id = $3 RETURNING *',
        [video_url, title || null, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Video not found'
        });
      }

      res.status(200).json({
        success: true,
        data: result.rows[0],
        message: 'Video updated successfully'
      });
    } catch (error) {
      console.error('Error updating video:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Delete video
  static async deleteVideo(req, res) {
    try {
      const { id } = req.params;

      const result = await pool.query('DELETE FROM videos WHERE id = $1 RETURNING *', [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Video not found'
        });
      }

      res.status(200).json({
        success: true,
        data: result.rows[0],
        message: 'Video deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting video:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
  // Search videos by URL or title (partial match)
  static async searchVideos(req, res) {
    try {
      const { query } = req.query;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }

      const result = await pool.query(
        'SELECT * FROM videos WHERE video_url ILIKE $1 OR title ILIKE $1 ORDER BY id DESC',
        [`%${query}%`]
      );

      res.status(200).json({
        success: true,
        data: result.rows,
        count: result.rows.length
      });
    } catch (error) {
      console.error('Error searching videos:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}

module.exports = VideoController;
