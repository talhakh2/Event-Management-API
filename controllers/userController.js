const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Authenticated User (Self) or Admin
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  // Check if requesting user is the same user or an admin
  if (req.user.role !== "admin" && req.user.id !== user.id.toString()) {
    res.status(403).json({ message: "Unauthorized access" });
    return;
  }

  res.json(user);
});

// @desc    Update user details
// @route   PUT /api/users/:id
// @access  Authenticated User (Self) or Admin
exports.updateUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  // Check if requesting user is the same user or an admin
  if (req.user.role !== "admin" && req.user.id !== user.id.toString()) {
    res.status(403).json({ message: "Unauthorized access" });
    return;
  }

  // Update user fields
  user.name = name || user.name;
  user.email = email || user.email;

  const updatedUser = await user.save();
  res.json(updatedUser);
});
