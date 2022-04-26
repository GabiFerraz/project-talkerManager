const fs = require('fs').promises;

const writeTalker = async (data) => {
  const dataJSON = await JSON.stringify(data);
  await fs.writeFile('./talker.json', dataJSON);
};

module.exports = writeTalker;