const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/jwtUtils.js");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // Create a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({ id: user._id, name: user.name, email: user.email });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Find the user by email
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  // Successfully authenticated, return a token
  res.json({ token: generateToken(user._id, user.role) });
});