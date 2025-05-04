const bcrypt = require('bcrypt');
const db = require('../db');
const response = require('../response/response');
const responseHandler = require('../response/responseHandler');
const { sendOtpToUser } = require('./helpers/authHelpers');
const generateToken = require('./helpers/jwt');

const saltRounds = 5;

const register = async (req, res) => {
  const trans = await db.sequelize.transaction();
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) return responseHandler(res, response.badRequest({ message: 'missing fields' }));

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const querry = `INSERT INTO USERS(firstName,lastName,email,password) VALUES(?,?,?,?)`;
    await db.sequelize.query(querry, {
      replacements: [firstName, lastName, email, hashedPassword],
      type: db.sequelize.QueryTypes.INSERT,
    });

    //sending OTP:
    await sendOtpToUser(email, firstName, lastName);

    await trans.commit();
    responseHandler(res, response.success({ message: 'registration successfully', data: { email } }));
  } catch (error) {
    await trans.rollback();
    if (error.name === 'SequelizeUniqueConstraintError') {
      responseHandler(res, response.failure({ message: 'Email already exists' }));
    } else {
      responseHandler(res, response.internalServerError({ message: `Internal server error - ${error}` }));
      console.log('error: ', error);
    }
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return responseHandler(res, response.badRequest({ message: 'missing fields' }));

    const querry = `SELECT * FROM REGISTERVERIFIES WHERE userId=? AND otp=?`;
    const result = await db.sequelize.query(querry, {
      replacements: [email, otp],
      type: db.sequelize.QueryTypes.SELECT,
    });

    if (result.length === 0) return responseHandler(res, response.badRequest({ message: 'Invalid OTP' }));

    // if (Date.now() > new Date(result[0].expiresAt).getTime())
    //   return responseHandler(res, response.failure({ message: 'Otp has been expired' }));

    const querry2 = `DELETE FROM REGISTERVERIFIES WHERE userId=? AND otp=?`;
    await db.sequelize.query(querry2, {
      replacements: [email, otp],
      type: db.sequelize.QueryTypes.DELETE,
    });

    //generating JWT Token
    const token = await generateToken({ email });
    responseHandler(res, response.success({ message: 'OTP verified successfully', data: { token, email } }));
  } catch (error) {
    responseHandler(res, response.internalServerError({ message: `Internal server error - ${error}` }));
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) return responseHandler(res, response.badRequest({ message: 'missing fields' }));

    const querry = `SELECT * FROM USERS WHERE EMAIL = ?`;
    const userData = await db.sequelize.query(querry, {
      replacements: [email],
      type: db.sequelize.QueryTypes.SELECT,
    });

    if (userData.length === 0) return responseHandler(res, response.unAuthorized({ message: 'Invalid email or password' }));

    const hashedPassword = userData[0].password;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
      return responseHandler(res, response.unAuthorized({ message: 'Invalid email or password' }));
    } else {
      const token = await generateToken({ email });
      responseHandler(res, response.success({ message: 'User logged in successfully', data: { token, email } }));
    }
  } catch (error) {
    responseHandler(res, response.internalServerError({ message: `Internal server error - ${error}` }));
  }
};

module.exports = {
  register,
  verifyOTP,
  logIn,
};
