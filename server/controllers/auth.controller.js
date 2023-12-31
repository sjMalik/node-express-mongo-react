/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel, ResetPasswordModel } = require('../models');
const { sendResetPasswordMail } = require('../utils/email');

exports.signup = async (req, res) => {
    try {
        const user = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        await user.save();
        return res.status(200).end();
    } catch (e) {
        return res.status(500).send({
            message: 'Error in signup',
        });
    }
};

exports.signin = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            username: req.body.username,
        });

        if (!user) {
            return res.status(404).send({
                message: 'User not found',
            });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password,
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: 'Password Invalid',
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

        return res.send({ token });
    } catch (e) {
        return res.status(500).send({
            message: 'Error in signin',
        });
    }
};

// Send Reset Password Link
// eslint-disable-next-line consistent-return
exports.sendForgotPasswordMail = async (req, res) => {
    const emailHash = bcrypt.hashSync(req.body.email, 8);
    const token = Math.random().toString(36).substring(7)
        + Math.round(new Date().getTime() / 1000) + emailHash;

    try {
        await sendResetPasswordMail(
            token,
            req.user.username,
            req.body.email,
            process.env.SITE_URI,
        );
        await ResetPasswordModel.updateOne(
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
            {
                upsert: true,
            },
        );

        res.send({
            message: 'Reset Password Link sent to the registered email successfully',
        });
    } catch (e) {
        return res.status(500).send({
            message: 'Error in Forgot Password email sending',
        });
    }
};

// eslint-disable-next-line consistent-return
exports.resetPassword = async (req, res) => {
    try {
        const document = await ResetPasswordModel.find({
            token: req.body.token,
        });
        // Check the token valid or not
        if (document && document.length > 0) {
            // Get the current timestamp in sec
            const currentTimestamp = Date.now() / 1000;
            // token generated timestamp + 10 mins
            const tokenExpiry = (new Date(document[0].timestamp) / 1000) + 600;
            // Check the token is not more than 10 mins old
            if (currentTimestamp < tokenExpiry) {
                await UserModel.updateOne(
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
                    message: 'Successfully reset Password',
                });
            } else {
                res.status(400).send({
                    message: 'Password Reset token has expired. Please request a new token',
                });
            }
        } else {
            res.status(400).send({
                message: 'Token is not valid',
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'Error in resetting password',
        });
    }
};
