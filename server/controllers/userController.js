const db = require('../db');
const response = require('../response/response');
const responseHandler = require('../response/responseHandler');

const userInfo = async (req, res) => {
  try {
    const { email } = req.user;
    if (!email) return responseHandler(res, response.badRequest({ message: 'email missing' }));

    const querry = `SELECT firstName, lastName, email FROM USERS WHERE email=?`;
    const result = await db.sequelize.query(querry, {
      replacements: [email],
      type: db.sequelize.QueryTypes.SELECT,
    });

    if (result.length === 0) return responseHandler(res, response.failure({ message: 'User not existed' }));

    const userData = result[0];
    responseHandler(res, response.success({ message: 'User fetched successfully', data: { userData } }));
  } catch (error) {
    responseHandler(res, response.internalServerError({ message: `Internal server error - ${error}` }));
  }
};

module.exports = { userInfo };
