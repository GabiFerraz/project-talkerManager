const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

router.get('/talker', async (_req, res, next) => {
  try {
    const data = await fs.readFile('./talker.json', 'utf-8');
    return res.status(200).json(JSON.parse(data));
  } catch (erro) {
    console.log(`Internal error. \n Message: ${erro}`);
    next({ message: 'Internal error' });
  }
});

module.exports = {
  router,
};