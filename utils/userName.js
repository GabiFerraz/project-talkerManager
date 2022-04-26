const Joi = require('joi');

const userName = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),
});

module.exports = userName;