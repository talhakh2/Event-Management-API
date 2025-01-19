const asyncHandler = require("express-async-handler");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

// @desc    Get top 5 most popular events
// @route   GET /api/analytics/events/popular
// @access  Admin
exports.getPopularEvents = asyncHandler(async (req, res) => {
  const events = await Event.aggregate([
    { $addFields: { attendeeCount: { $size: "$attendees" } } },
    { $sort: { attendeeCount: -1 } },
    { $limit: 5 },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        attendeeCount: 1,
        location: 1,
      },
    },
  ]);

  res.json(events);
});

// @desc    Get top 5 most active users
// @route   GET /api/analytics/users/active
// @access  Admin
exports.getActiveUsers = asyncHandler(async (req, res) => {
  const users = await Registration.aggregate([
    { $group: { _id: "$user", registrationCount: { $sum: 1 } } },
    { $sort: { registrationCount: -1 } },
    { $limit: 5 },
    { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
    { $unwind: "$user" },
    {
      $project: {
        _id: 1,
        name: "$user.name",
        email: "$user.email",
        registrationCount: 1,
      },
    },
  ]);

  res.json(users);
});

// @desc    Get event stats for a specific event
// @route   GET /api/analytics/events/:id/stats
// @access  Organizer or Admin
exports.getEventStats = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  // Only organizer or admin can fetch stats
  if (
    req.user.role !== "admin" &&
    event.organizer.toString() !== req.user._id.toString()
  ) {
    res.status(403).json({ message: "You are not authorized to view stats" });
    return;
  }

  const totalAttendees = event.attendees.length;

  res.json({
    event: {
      id: event.id,
      name: event.name,
      capacity: event.capacity,
      attendees: totalAttendees,
    },
  });
});