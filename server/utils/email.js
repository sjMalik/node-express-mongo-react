const format = require('string-template');
const sgMail = require('@sendgrid/mail');
const url = require('url');

require('dotenv').config();

// Set the sendgrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const resetEmailBody = `Dear {username}, <br/><br/>
Welcome to My Library App <br/>
Please click the link below to reset your password <br/><br/>
<a  style ="display: block;
    width: 115px;
    height: 25px;
    background: #4E9CAF;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    color: white;
    font-weight: bold;" href="{url}" target="_blank">Verify</a>
<br/><br/>
You can also copy & paste this link in a browser window: {url}<br/><br/><br/>
<p style="color: red">N.B: The link will be valid for 10 minutes</p>`;

exports.sendResetPasswordMail = (token, username, userEmail, siteUri) => {
    const link = url.resolve(siteUri, '/resetPassword');
    const message = {
        to: userEmail,
        from: process.env.SENDGRID_NOREPLY_EMAIL,
        subject: 'Password Reset Email for My Library App',
        html: format(resetEmailBody, {
            username,
            url: `${link}?token=${token}`,
        }),
    };
    return sgMail.send(message);
};
