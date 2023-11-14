const express = require('express');
const { checkDuplicateUsernameOrEmail } = require('../middlewares');

const router = express.Router();

const authController = require('../controllers/auth.controller');

router.post('/signup', checkDuplicateUsernameOrEmail, authController.signup);

router.post('/signin', authController.signin);

module.exports = router;
