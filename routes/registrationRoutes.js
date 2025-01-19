const express = require("express");
const { protect, authorize} = require("../middleware/authMiddleware.js");
const {
  registerForEvent,
  cancelRegistration,
  getAttendees
} = require("../controllers/registrationController");

const router = express.Router();

router.route("/:id/register")
  .post(protect, registerForEvent)
  .delete(protect, cancelRegistration);

router.route("/:id/attendees")
  .get(protect, authorize("admin", "organizer"), getAttendees)

module.exports = router;