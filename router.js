const express = require('express');

const crypto = require('crypto');

const router = express.Router();

const readTalker = require('./utils/readTalker');

const emailValidation = require('./utils/emailValidation');

const passwordValidation = require('./utils/passwordValidation');

// const userEmail = require('./utils/userEmail');

// const userPassword = require('./utils/userPassword');

router.get('/talker', async (_req, res, next) => {
  try {
    const data = await readTalker();
    return res.status(200).json(data);
  } catch (erro) {
    console.log(`Internal error. \n Message: ${erro}`);
    next({ message: 'Internal error' });
  }
});

router.get('/talker/:id', async (req, res, next) => {
  const { id } = req.params;

  const data = await readTalker();
  const talkerPerson = data.find((person) => person.id === Number(id)); 
  
  if (!talkerPerson) {
    return next({ status: 404, message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerPerson);
});

router.post('/login', emailValidation, passwordValidation, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex'); // hexadecimal, transformando o número em string
  return res.status(200).json({ token });
});

module.exports = router;