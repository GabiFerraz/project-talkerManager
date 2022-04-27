const fs = require('fs').promises;

const writeTalker = async (data) => {
  const dataJSON = await JSON.stringify(data, null, 2); // parâmetros null e 2 servem pra deixar o JSON estruturado. O 2 é pra dar a tabulação.
  await fs.writeFile('./talker.json', dataJSON);
};

module.exports = writeTalker;