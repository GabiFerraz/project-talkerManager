const crypto = require('crypto');

const userToken = () => {
  const token = crypto.randomBytes(8).toString('hex'); // hexadecimal, transformando o número em string
  return token;
};

module.exports = userToken;