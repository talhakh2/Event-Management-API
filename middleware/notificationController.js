const nodemailer = require('nodemailer');
const Event = require('../model/event');

exports.sendNotification = async (req, res) => {
  const { eventId, message } = req.body;

  try {
    const event = await Event.findById(eventId).populate('attendees', 'email name');
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const attendeesEmails = event.attendees.map((attendee) => attendee.email);

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: attendeesEmails,
      subject: `Notification for Event: ${event.name}`,
      text: message,
    });

    res.json({ message: 'Notification sent successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
