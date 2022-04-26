const Joi = require('joi');

const userPassword = Joi.object({
  password: Joi.string()
    .min(6)
    .required(),
});

module.exports = userPassword;