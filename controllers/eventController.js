const Event = require("../models/Event");
const asyncHandler = require("express-async-handler");

// @desc    Create a new event
// @route   POST /api/events
// @access  Organizer only
exports.createEvent = asyncHandler(async (req, res) => {
  const { name, description, date, location, capacity } = req.body;

  const event = await Event.create({
    name,
    description,
    date,
    location,
    capacity,
    organizer: req.user._id,
  });

  res.status(201).json(event);
});

// @desc    Get all events list only
// @route   GET /api/events
// @access  Public
exports.getAllEventsList = asyncHandler(async (req, res) => {
  const events = await Event.find().select("name description");
  res.json(events);
});

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate("attendees", "name email");
  if (!event) {
    res.status(404).json({ message: "Event not found" });
    return;
  }
  res.json(event);
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Organizer only
exports.updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  // Only the organizer who created the event can update it
  if (event.organizer.toString() !== req.user._id.toString()) {
    res.status(403).json({ message: "You are not authorized to update this event" });
    return;
  }

  // Update event details
  const { name, description, date, location, capacity } = req.body;
  event.name = name || event.name;
  event.description = description || event.description;
  event.date = date || event.date;
  event.location = location || event.location;
  event.capacity = capacity || event.capacity;

  const updatedEvent = await event.save();
  res.json(updatedEvent);
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Organizer only
exports.deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  // Only the organizer who created the event can delete it
  if (event.organizer.toString() !== req.user._id.toString()) {
    res.status(403).json({ message: "You are not authorized to delete this event" });
    return;
  }

  await event.deleteOne(); 
  res.json({ message: "Event deleted successfully" });
});