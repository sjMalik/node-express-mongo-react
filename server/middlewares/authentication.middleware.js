/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    try {
        let token;
        if (req.headers && !req.headers.authorization) {
            return res.status(401).json({
                message: 'No Authorization header was found',
            });
        }

        const parts = req.headers.authorization.split(' ');
        if (parts.length !== 2) {
            return res.status(401).json({
                message: 'Format is Authorization: Bearer [token]',
            });
        }

        const scheme = parts[0];
        const credentials = parts[1];
        if (/^Bearer$/i.test(scheme)) {
            token = credentials;
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (e) {
        return res.status(401).send({
            message: 'Unauthorized!',
        });
    }
};
