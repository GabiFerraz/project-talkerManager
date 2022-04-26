const Joi = require('joi');

const userAge = Joi.object({
  age: Joi.number()
    .integer()
    .min(18)
    .required(),
});

module.exports = userAge;