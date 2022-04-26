const express = require('express');

const router = express.Router();

const readTalker = require('./utils/readTalker');

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

module.exports = router;