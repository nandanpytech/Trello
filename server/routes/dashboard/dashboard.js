const express = require('express');
const app = express();
const userRouter = express.Router();
const userController = require('../../controllers/userController');
const verifyToken = require('../../middleware/auth/verifyToken');

userRouter.use(verifyToken);
userRouter.post('/userInfo', userController.userInfo);

module.exports = userRouter;
