const User = require("../models/User");
const Event = require("../models/Event");
const asyncHandler = require("express-async-handler");

// // @desc    Get all users - both organizers and users
// // @route   GET /api/admin/users
// // @access  Admin
exports.getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1
  const limit = parseInt(req.query.limit, 10) || 5; // Default to 10 users per page
  const skip = (page - 1) * limit;

  // Fetch users with pagination
  const users = await User.find({ isDeleted: false })
    .select("-password")
    .skip(skip)
    .limit(limit);

  // Get the total number of users for pagination info
  const totalUsers = await User.countDocuments({ isDeleted: false });

  res.json({
    users,
    pagination: {
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      pageSize: limit,
    },
  });
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