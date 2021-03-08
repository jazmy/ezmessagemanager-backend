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
			let email = ctx.request.body.email;
			const result = await strapi
				.query("Employees")
				.model.query((qb) => {
					qb.where("email", email);
				})
				.fetch();
			if (result != null) {
				//do operation
				const emp = result.toJSON();
				return emp;
			}
		}
	}
};
