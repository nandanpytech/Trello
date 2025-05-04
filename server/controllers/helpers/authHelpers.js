const crypto = require('crypto');
const sendOtpByEmail = require('../../service/nodemailer');
const db = require('../../db');

async function sendOtpToUser(email) {
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + 1000);

  const querry2 = `INSERT INTO REGISTERVERIFIES(userId,otp,expiresAt) VALUES(?,?,?)`;
  await db.sequelize.query(querry2, {
    replacements: [email, otp, expiresAt],
    type: db.sequelize.QueryTypes.INSERT,
  });

  //send otp to user email
  const info = {
    email: email,
    subject: 'OTP for registration',
    otp: otp,
    text: `Your OTP for registration is: ${otp}`,
  };
  await sendOtpByEmail(info);
}

module.exports = {
  sendOtpToUser,
};
