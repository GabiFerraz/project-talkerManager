const fs = require('fs').promises;

const readTalker = async () => {
  const data = await fs.readFile('./talker.json');
  const dataJSON = await JSON.parse(data);
  return dataJSON;
};

module.exports = readTalker;