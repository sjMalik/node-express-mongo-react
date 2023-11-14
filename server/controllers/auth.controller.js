/* eslint-disable import/no-extraneous-dependencies */
const debug = require('debug')('library:authController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');

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
