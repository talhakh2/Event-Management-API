const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(verified.id).select('-password');
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};


module.exports = authMiddleware;
