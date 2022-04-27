const userName = require('../utils/userName');

const nameValidation = (req, _res, next) => {
  const { name } = req.body;

  const { error } = userName.validate({ name });
  
  if (name === undefined) {
    return next({ status: 400, message: 'O campo "name" é obrigatório' });
  }

  if (error) {
    return next({ status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

module.exports = nameValidation;