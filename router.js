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

router.get('/talker/search', tokenValidation, async (req, res) => {
  const { q } = req.query;

  const data = await readTalker();

  const talkerPerson = data.filter((person) => person.name.includes(q));
  // se no data tiver o parâmetro colocado na url(o que vem depois do q=) ele retorna o array com as informações daquela pessoa, se não tiver, ele vai retornar um array vazio, já que o filter retorna um array.

  if (talkerPerson === undefined || talkerPerson === '') { // se não for informado(undefinded) ou estiver vazio
    return res.status(200).json(data); // retorna todos os palestrantes
  }

  return res.status(200).json(talkerPerson); // vai retornar a pessoa pesquisada ou o array vazio
});

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
  
  if (talkerPerson === undefined) {
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

router.put('/talker/:id', tokenValidation, nameValidation, ageValidation,
talkValidation, watchedAtValidation, rateValidation, async (req, res) => {
  const { id } = req.params;

  const data = await readTalker();

  const talkerPerson = data.find((person) => person.id === Number(id));
  const indexPerson = data.findIndex((person) => person.id === talkerPerson.id); // encontrando o index, a posição da pessoa do id que eu quero editar está.
  // findIndex https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex#descri%C3%A7%C3%A3o
  
  const { name, age, talk } = req.body; // aqui eu estou pegando do body as novas informações que vão substituir as antigas que o front está enviando.
  talkerPerson.name = name;
  talkerPerson.age = age;
  talkerPerson.talk = talk;
  data[indexPerson] = talkerPerson; // estou atualizando no data as info da pessoa do id que eu editei.
  await writeTalker(data); // estou reescrevendo o data com as novas informações.
  
  return res.status(200).json(talkerPerson); // estou retornando só as informações da pessoa editada.
});

router.delete('/talker/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;

  const data = await readTalker();

  const talkerPerson = data.find((person) => person.id === Number(id));
  const newData = data.filter((person) => person.id !== talkerPerson.id); // mandando retornar todo mundo, menos a pessoa do id passado que é quem eu quero deletar.
  
  await writeTalker(newData);

  return res.status(204).json(newData);
});

module.exports = router;