const User = require("../models/User");
const Event = require("../models/Event");
const asyncHandler = require("express-async-handler");

// @desc    Get all users (Admin only)
// @route   GET /api/admin/users
// @access  Admin
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isDeleted: false }).select("-password");
  res.json(users);
});


// @desc    Get all events
// @route   GET /api/admin/events
// @access  Admin
exports.getAllEventsWithStats = asyncHandler(async (req, res) => {
    const events = await Event.find().populate("organizer", "name email").populate("attendees", "name email");
    res.json(events);
  });


// @desc    Delete a user (soft delete)
// @route   DELETE /api/admin/users/:id
// @access  Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  user.isDeleted = true; // Soft delete user
  await user.save();

  res.json({ message: "User deleted successfully" });
});