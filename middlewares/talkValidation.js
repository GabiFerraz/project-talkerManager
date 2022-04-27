const talkValidation = (req, _res, next) => {
  const { talk } = req.body;

  if (talk === undefined || talk.watchedAt === undefined || talk.rate === undefined) {
    return next({ 
      status: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

module.exports = talkValidation;