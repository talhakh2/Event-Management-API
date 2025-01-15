const Event = require('../model/event');

exports.createEvent = async (req, res) => {
  const { name, description, date, location, capacity } = req.body;

  try {
    const event = new Event({ name, description, date, location, capacity, organizer: req.user._id });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.attendees.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already registered' });
    }

    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }

    event.attendees.push(req.user._id);
    await event.save();

    res.json({ message: 'Registered successfully', event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
