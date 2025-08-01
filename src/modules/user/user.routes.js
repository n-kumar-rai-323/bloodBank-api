const { UserRole } = require('../../config/constants');
const auth = require('../auth/auth.middleware');
const userCtrl = require('./user.controller');

const userRouter = require('express').Router();

userRouter.get('/', auth([UserRole.ADMIN]), userCtrl.getAllUsersList);

module.exports = userRouter;