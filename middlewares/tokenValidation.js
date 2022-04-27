const tokenValidation = (req, _res, next) => {
  const { authorization } = req.headers;

  if (authorization === undefined) {
    return next({ status: 401, message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return next({ status: 401, message: 'Token inválido' });
  }

  next();
};

module.exports = tokenValidation;