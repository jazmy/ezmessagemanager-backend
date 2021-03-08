module.exports = ({ env }) => ({
  url: env("STRAPI_URL"),
  port: env.int("PORT", process.env.PORT),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'SecretHere'),
    },
  },
});