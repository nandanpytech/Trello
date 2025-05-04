const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const responseHandler = require('../../response/responseHandler');
const response = require('../../response/response');
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  try {
    if (!token) return responseHandler(res, response.badRequest({ message: 'Data missing' }));

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      req.user = user;
      if (err) return responseHandler(res, response.unAuthorized({ message: 'Invalid token' }));
      next();
    });
  } catch (error) {
    responseHandler(res, response.serverError({ message: error }));
  }
};

module.exports = verifyToken;
