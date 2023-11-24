const { checkDuplicateUsernameOrEmail, checkUserNameOrEmailExist } = require('./validation.middleware');
const { verifyToken } = require('./authentication.middleware');

module.exports = {
    checkDuplicateUsernameOrEmail,
    verifyToken,
    checkUserNameOrEmailExist,
};
