const Joi = require('joi');

const userRate = Joi.object({
  rate: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required(),
});

module.exports = userRate;