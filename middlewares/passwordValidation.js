const userPassword = require('../utils/userPassword');

const passwordValidation = (req, _res, next) => {
  const { password } = req.body;

  const { error } = userPassword.validate({ password });

  if (password === undefined) {
    return next({ status: 400, message: 'O campo "password" é obrigatório' });
  }
  if (error) {
    return next({ status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = passwordValidation;