const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const { NODE_MAILER_EMAIL, NODE_MAILER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: NODE_MAILER_EMAIL,
    pass: NODE_MAILER_PASSWORD,
  },
});

async function sendOtpByEmail(info) {
  try {
    await transporter.sendMail({
      from: `"Trello Workflow 👻" <${NODE_MAILER_EMAIL}>`, // sender address
      to: info.email, // list of receivers
      subject: info.subject, // Subject line
      text: info.text, // plain text body
      html: `<span>Your OTP for verification: <b>${info.otp}</b></span>`, // html body
    });
  } catch (error) {
    console.log('error: ', error);
  }

  console.log('Message sent: %s', info.messageId);
}

module.exports = sendOtpByEmail;
