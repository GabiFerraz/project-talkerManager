const express = require('express');

const router = express.Router();

const readTalker = require('./utils/readTalker');

const emailValidation = require('./middlewares/emailValidation');

const passwordValidation = require('./middlewares/passwordValidation');

const userToken = require('./utils/userToken');

const tokenValidation = require('./middlewares/tokenValidation');

const writeTalker = require('./utils/writeTalker');

const nameValidation = require('./middlewares/nameValidation');

const ageValidation = require('./middlewares/ageValidation');

const watchedAtValidation = require('./middlewares/watchedAtValidation');

const rateValidation = require('./middlewares/rateValidation');

const talkValidation = require('./middlewares/talkValidation');

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
  const token = userToken();
  return res.status(200).json({ token });
});

router.post('/talker', tokenValidation, nameValidation, ageValidation,
talkValidation, watchedAtValidation, rateValidation, async (req, res) => {
  const data = await readTalker();
  const person = req.body;

  person.id = data.length + 1;

  data.push(person);
  await writeTalker(data);

  return res.status(201).json(person);
});

module.exports = router;