/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const debug = require('debug')('library:authController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel, ResetPassword } = require('../models');
const { sendResetPasswordMail } = require('../utils/email');
const userModel = require('../models/user.model');

exports.signup = async (req, res) => {
    try {
        const user = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        await user.save();
        res.status(200).end();
    } catch (e) {
        debug(e);
        res.status(500).send({
            message: 'Error in sign up',
        });
    }
};

exports.signin = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            username: req.body.username,
        });

        if (!user) {
            return res.status(404).send({ message: 'User Not found.' });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password,
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid Password!',
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            },
        );

        res.send({
            token,
        });
    } catch (e) {
        debug(e);
        res.status(500).send({
            message: 'Error in login',
        });
    }
};

// Send Reset Password Link
exports.sendForgotPasswordMail = async (req, res) => {
    const emailhash = bcrypt.hashSync(req.body.email, 8);
    const token = Math.random().toString(36).substring(7)
        + Math.round((new Date()).getTime() / 1000) + emailhash;
    debug(req.user);

    try {
        await sendResetPasswordMail(token, req.user.username, req.body.email, process.env.SITE_URI);
        await ResetPassword.updateOne(
            {
                email: req.body.email,
            },
            {
                $set: {
                    email: req.body.email,
                    token,
                    siteuri: process.env.SITE_URI,
                    timestamp: Date.now(),
                },
            },
            { upsert: true },
        );
        res.send({
            token,
            message: 'Reset password link sent to registered email successfully',
        });
    } catch (e) {
        debug(e);
        res.status(500).send({
            message: 'Error in forgot password request',
        });
    }
};

// chek password reset token
exports.resetPassword = async (req, res) => {
    try {
        const document = await ResetPassword.find({
            token: req.body.token,
        });
        if (document && document.length > 0) {
            const currentTimestamp = Date.now() / 1000;
            const tokenExpiry = (new Date(document[0].timestamp).getTime() / 1000) + 600; // 10 mins
            if (currentTimestamp < tokenExpiry) {
                // eslint-disable-next-line no-underscore-dangle
                await userModel.updateOne(
                    {
                        email: document[0].email,
                    },
                    {
                        $set: {
                            password: bcrypt.hashSync(req.body.password, 8),
                        },
                    },
                );
                res.send({
                    message: 'Successfully reset password',
                });
            } else {
                res.status(400).send({
                    message: 'Password reset token has expired. Please request a new token.',
                });
            }
        } else {
            res.status(400).send({
                message: 'Token not valid',
            });
        }
    } catch (e) {
        res.status(500).send({
            message: 'Error in reset password',
        });
    }
};
