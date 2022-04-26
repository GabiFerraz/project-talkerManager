const userEmail = require('../utils/userEmail');

const emailValidation = (req, _res, next) => {
  const { email } = req.body;

  const { error } = userEmail.validate({ email });
  
  if (!email) {
    return next({ status: 400, message: 'O campo "email" é obrigatório' });
  }

  if (error) {
    return next({ status: 400, message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = emailValidation;