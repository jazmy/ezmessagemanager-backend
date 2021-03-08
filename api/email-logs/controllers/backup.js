"use strict";
//strapi-utils is a module from strapi performs certain operations like getting json
//values from an api
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
//axios is a lib to send requests
const axios = require("axios");
//dotenv is to load envirnment configs
const dotenv = require("dotenv");

let SERVER = process.env.SERVER_URL;

let handlebars = require("handlebars");

module.exports = {
	index: async (ctx) => {
		//we check if data is multipart or not
		if (ctx.is("multipart")) {
			const { data, files } = parseMultipartData(ctx);
			return;
		} else {
			//accepting external params from frontend, this is a syntax provided by strapi
			let receipts_emails = ctx.request.body.receipts_emails;
			let from = ctx.request.body.from;
			let subject = ctx.request.body.subject;
			let text = ctx.request.body.text;
			let htmlgen = unescape(ctx.request.body.htmlgen);
			let template = handlebars.compile(htmlgen);
			let token = ctx.request.body.token;
			//looping through all emails we got through frontend to make sure that every one gets email
			for (let index = 0; index < receipts_emails.length; index++) {
				// we got current user to send him/her an email now
				const current_receipt_email = receipts_emails[index];
				let to = current_receipt_email;
				const result = await strapi
					.query("Employees")
					.model.query((qb) => {
						qb.where("email", current_receipt_email);
					})
					.fetch();
				if (result != null) {
					//do operation
					const emp = result.toJSON();
					let user = [
						{
							firstname: emp.firstname,
							lastname: emp.lastname,
							hiredate: emp.hiredate,
							created_at: emp.created_at,
							updated_at: emp.updated_at
						}
					];
					let replacements = user[0];
					let htmlToSend = template(replacements);
					try {
						//we are sending the email to current user now
						await strapi.plugins["email"].services.email.send({
							from: from,
							to: to,
							subject: subject,
							text: text,
							html: htmlToSend
						});

						//we are storing the logs now
						await axios.post(
							`${SERVER}Email-Logs`,
							{
								email: to,
								subject: subject,
								message: htmlToSend,
								text: text,
								status: "Sent",
								datesent: new Date()
							},
							{
								headers: { Authorization: `Bearer ${token}` }
							}
						);
					} catch (error) {
						await axios.post(
							`${SERVER}Email-Logs`,
							{
								email: to,
								subject: subject,
								message: "WAS NOT DELEIVED",
								status: "Error While Sending"
							},
							{
								headers: { Authorization: `Bearer ${token}` }
							}
						);
					}
				} else {
					await axios.post(
						`${SERVER}Email-Logs`,
						{
							email: to,
							subject: subject,
							message: htmlToSend,
							status: "User Data was not found!"
						},
						{
							headers: { Authorization: `Bearer ${token}` }
						}
					);
					continue;
				}

				//when all emails sent! we returns a nice message
				if (index === receipts_emails.length - 1) {
					ctx.send("EMAIL SENDING OPERATION DONE SUCCESSFULLY");
				}
			}
		}
	}
};
