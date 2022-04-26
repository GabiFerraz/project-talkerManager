const userAge = require('../utils/userAge');

const ageValidation = (req, _res, next) => {
  const { age } = req.body;

  const { error } = userAge.validate({ age });
  
  if (!age) {
    return next({ status: 400, message: 'O campo "age" é obrigatório' });
  }

  if (error) {
    return next({ status: 400, message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

module.exports = ageValidation;