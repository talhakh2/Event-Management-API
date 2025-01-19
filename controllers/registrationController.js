const asyncHandler = require("express-async-handler");
const Event = require("../models/Event");
const User = require("../models/User");
const Registration = require("../models/Registration");

// @desc    Register a user for an event
// @route   POST /api/registrations/:id/register
// @access  Authenticated users
exports.registerForEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  // Check if event capacity is exceeded
  if (event.attendees.length >= event.capacity) {
    res.status(400).json({ message: "Event is at full capacity" });
    return;
  }

  // Check if user has already registered
  const alreadyRegistered = event.attendees.some((attendee) =>
    attendee._id.equals(req.user._id)
  );

  if (alreadyRegistered) {
    res.status(400).json({ message: "You are already registered for this event" });
    return;
  }

  // Add user to event attendees
  event.attendees.push(req.user._id);
  await event.save();

  // Create registration record
  const registration = await Registration.create({
    user: req.user._id,
    event: event._id,
  });

  res.status(201).json({ message: "Registered successfully", registration });
});

// @desc    Cancel a user's registration
// @route   DELETE /api/registrations/:id/register
// @access  Authenticated users
exports.cancelRegistration = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  // Check if the user is registered for the event
  const isRegistered = event.attendees.some((attendee) =>
    attendee._id.equals(req.user._id)
  );

  if (!isRegistered) {
    res.status(400).json({ message: "You are not registered for this event" });
    return;
  }

  // Remove the user from event attendees
  event.attendees = event.attendees.filter(
    (attendee) => !attendee._id.equals(req.user._id)
  );
  await event.save();

  // Remove registration record
  await Registration.findOneAndDelete({
    user: req.user._id,
    event: event._id,
  });

  res.json({ message: "Registration canceled successfully" });
});

// @desc    Get attendees for an event
// @route   GET /api/registrations/:id/attendees
// @access  Organizer or Admin only
exports.getAttendees = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate("attendees", "name email");

  if (!event) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  // Only organizer or admin can fetch attendees
  if (
    req.user.role !== "admin" &&
    event.organizer.toString() !== req.user._id.toString()
  ) {
    res.status(403).json({ message: "You are not authorized to view attendees" });
    return;
  }

  res.json(event.attendees);
});
