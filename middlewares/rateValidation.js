const userRate = require('../utils/userRate');

const rateValidation = (req, _res, next) => {
  const { talk: { rate } } = req.body;

  const { error } = userRate.validate({ rate });

  if (error) {
    return next({ status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = rateValidation;