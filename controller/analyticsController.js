const Event = require('../model/event');
const User = require('../model/user');

/**
 * @desc    Get the top 5 most registered events
 * @route   GET /analytics/events/popular
 * @access  Admin Only
 */
exports.getPopularEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ attendees: -1 }) // Sort by the number of attendees
      .limit(5)
      .populate('organizer', 'name email'); // Populate organizer details

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc    Get the top 5 most active users
 * @route   GET /analytics/users/active
 * @access  Admin Only
 */
exports.getActiveUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'events', // The Event collection
          localField: '_id',
          foreignField: 'attendees', // Match user ID in attendees array
          as: 'registeredEvents',
        },
      },
      { $addFields: { registrationsCount: { $size: '$registeredEvents' } } }, // Count registrations
      { $sort: { registrationsCount: -1 } }, // Sort by count
      { $limit: 5 }, // Limit to top 5
    ]);

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
