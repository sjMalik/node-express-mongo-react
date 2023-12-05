/* eslint-disable consistent-return */
const { UserModel } = require('../models');

exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({
            username: req.body.username,
        });

        if (user) {
            return res.status(400).send({
                message: 'Failed! Username is already in use',
            });
        }

        const userByEmail = await UserModel.findOne({
            email: req.body.email,
        });

        if (userByEmail) {
            return res.status(400).send({
                message: 'Failed! Email is already in use',
            });
        }

        next();
    } catch (e) {
        res.status(500).send({
            message: e,
        });
    }
};

exports.checkUsernameOrEmailExist = async (req, res, next) => {
    const user = await UserModel.findOne({
        username: req.body.username,
    });

    if (!user) {
        return res.status(400).send({
            message: 'Failed! username not exist!',
        });
    }

    const userByEmail = await UserModel.findOne({
        email: req.body.email,
    });

    if (!userByEmail) {
        return res.status(400).send({
            message: 'Failed! email not exist!',
        });
    }
    req.user = user;

    next();
};

exports.checkResetPasswordPayload = async (req, res, next) => {
    const { token, password } = req.body;

    if (!token) {
        return res.status(400).send({
            message: 'Token is missing',
        });
    }

    if (!password) {
        return res.status(400).send({
            message: 'Password is missing',
        });
    }

    next();
};
