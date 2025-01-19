const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text }) => {
  try {
    // Configure the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Define the email options
    const mailOptions = {
      from: '"Event APP" <talhakhawaja60@gmail.com>', 
      to, 
      subject, 
      text, 
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);

  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    throw error;
  }
};

module.exports = sendEmail;
