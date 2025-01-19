const express = require("express");
const {
  createEvent,
  getAllEventsList,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect, authorize } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.route("/")
  .post(protect, authorize("organizer"), createEvent)
  .get(getAllEventsList); // For public list only

router.route("/:id")
  .get(getEventById)
  .put(protect, authorize("organizer"), updateEvent)
  .delete(protect, authorize("organizer"), deleteEvent);

module.exports = router;