'use strict';
const dotenv = require('dotenv');
let user = process.env.MAIL_TRAP_USER;
let password = process.env.MAIL_TRAP_USER_PASS_WORD;
let emailSender = process.env.EMAIL_FROM;
// console.log(user, password, emailSender),
module.exports = () => ({
	email: {
		provider: 'mailtrap',
		providerOptions: {
			user: user,
			password: password
		},
		settings: {
			defaultFrom: process.env.emailSender
			// defaultReplyTo: env('MAILTRAP_DEFAULT_REPLY_TO', 'default@value.com')
		}
	}
});
