const express = require('express');
const authRouter = express.Router();
const authController = require('../../controllers/authController');

authRouter.post('/register', authController.register);
authRouter.post('/verifyOtp', authController.verifyOTP);
authRouter.post('/logIn', authController.logIn);
module.exports = authRouter;
