const express = require('express');
const authController = require('../controllers/auth.controller');
const { checkDuplicateUsernameOrEmail, checkUsernameOrEmailExist, checkResetPasswordPayload } = require('../middlewares');

const router = express.Router();

router.post('/signup', checkDuplicateUsernameOrEmail, authController.signup);
router.post('/signin', authController.signin);
router.post('/forgotPassword', checkUsernameOrEmailExist, authController.sendForgotPasswordMail);
router.post('/resetPassword', checkResetPasswordPayload, authController.resetPassword);

module.exports = router;
