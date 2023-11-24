const express = require('express');
const { checkDuplicateUsernameOrEmail, checkUserNameOrEmailExist } = require('../middlewares');

const router = express.Router();

const authController = require('../controllers/auth.controller');

router.post('/signup', checkDuplicateUsernameOrEmail, authController.signup);

router.post('/signin', authController.signin);

router.post('/forgotPassword', checkUserNameOrEmailExist, authController.sendForgotPasswordMail);

router.post('/resetPassword', authController.resetPassword);

module.exports = router;
