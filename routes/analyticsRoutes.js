const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware.js");
const {
  getPopularEvents,
  getActiveUsers,
  getEventStats,
} = require("../controllers/analyticsController");

const router = express.Router();

router.route("/events/popular")
  .get(protect, authorize("admin"), getPopularEvents);

router.route("/users/active")
  .get(protect, authorize("admin"), getActiveUsers);

router.route("/events/:id/stats")
  .get(protect, authorize("admin", "organizer"), getEventStats);

module.exports = router;