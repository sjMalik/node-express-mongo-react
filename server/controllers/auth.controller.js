/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
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
