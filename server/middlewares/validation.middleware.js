const { UserModel } = require('../models');

exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({
            username: req.body.username,
        });

        if (user) {
            res.status(400).send({ message: 'Failed! Username is already in use!' });
            return;
        }

        const userByEmail = await UserModel.findOne({
            email: req.body.email,
        });

        if (userByEmail) {
            res.status(400).send({ message: 'Failed! Email is already in use!' });
            return;
        }

        next();
    } catch (e) {
        res.status(500).send({ message: e });
    }
};
