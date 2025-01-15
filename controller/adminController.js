const User = require('../model/user');

exports.getAllUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-password');

    const totalUsers = await User.countDocuments();
    res.json({ users, totalPages: Math.ceil(totalUsers / limit), currentPage: parseInt(page) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.isDeleted = true;
      await user.save();
  
      res.json({ message: 'User soft deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  