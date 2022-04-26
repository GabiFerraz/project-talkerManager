const Joi = require('joi');

const userEmail = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
});

module.exports = userEmail;

// Documentação do Joi: https://joi.dev/api/?v=17.6.0