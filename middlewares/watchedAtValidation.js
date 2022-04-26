const watchedAtValidation = (req, _res, next) => {
  const { talk: { watchedAt } } = req.body;

  const regex = new RegExp(/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/);

  if (!regex.test(watchedAt)) {
    return next({ status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = watchedAtValidation;