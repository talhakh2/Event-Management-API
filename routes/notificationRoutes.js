const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware.js");
const { sendNotification } = require("../controllers/notificationController");

const router = express.Router();

router.route("/send")
  .post(protect, authorize("organizer", "admin"), sendNotification);

module.exports = router;