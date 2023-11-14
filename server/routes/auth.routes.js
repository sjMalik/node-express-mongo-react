const express = require('express');
const authController = require('../controllers/auth.controller');
const { checkDuplicateUsernameOrEmail } = require('../middlewares');

const router = express.Router();

router.post('/signup', checkDuplicateUsernameOrEmail, authController.signup);
router.post('/signin', authController.signin);

module.exports = router;
