const express = require('express');
const {
  getPopularEvents,
  getActiveUsers,
} = require('../controller/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

/**
 * @route   GET /analytics/events/popular
 * @desc    Get the top 5 most registered events
 * @access  Admin Only
 */
router.get('/events/popular', authMiddleware, adminMiddleware, getPopularEvents);

/**
 * @route   GET /analytics/users/active
 * @desc    Get the top 5 most active users based on registrations
 * @access  Admin Only
 */
router.get('/users/active', authMiddleware, adminMiddleware, getActiveUsers);

module.exports = router;
