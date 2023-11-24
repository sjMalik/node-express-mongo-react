/* eslint-disable import/no-extraneous-dependencies */
const format = require('string-template');
const sgMail = require('@sendgrid/mail');
const url = require('url');

require('dotenv').config();

// Set the sendgrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const resetEmail = `Hello {userEmail}<br/><br/>
Welcome To My Library App <br/>
Please click the link below to reset your password<br/>
<a style="display: block;
   width: 115px;
   height: 25px;
   background: #4E9CAF;
   padding: 10px;
   text-align: center;
   border-radius: 5px;
   color: white;
   font-weight: bold;" href="{url}" target="_blank" >Verify</a>      
<br/><br/><br/>
You can also copy and paste this link in a browser window: {url}
`;

exports.sendResetPasswordMail = (tokens, userEmail, siteurl) => {
    const link = url.resolve(siteurl, '/resetPassword');
    const msg = {
        to: userEmail,
        from: process.env.SENDGRID_NOREPLY_EMAIL,
        subject: 'Password Reset Email For My Library App',
        html: format(resetEmail, {
            userEmail,
            url: `${link}?=${tokens}`,
        }),
    };
    return sgMail.send(msg);
};
