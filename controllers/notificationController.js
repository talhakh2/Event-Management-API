const sendEmail = require("../utils/sendEmail.js");
const Event = require("../models/Event");
const asyncHandler = require("express-async-handler");

// @desc    Send notifications to attendees
// @route   POST /api/notifications/send
// @access  Organizer/Admin
exports.sendNotification = asyncHandler(async (req, res) => {
  const { event_id, message, subject } = req.body;

  const event = await Event.findById(event_id).populate("attendees", "email");

  if (!event) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  try {
    // Send email to each attendee
    const emailPromises = event.attendees.map((attendee) =>
      sendEmail({
        to: attendee.email,
        subject: subject || "Notification from Event Organizer",
        text: message,
      })
    );

    await Promise.all(emailPromises);

    res.json({ message: "Notifications sent to attendees" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ message: "Error sending notifications" });
  }
});
