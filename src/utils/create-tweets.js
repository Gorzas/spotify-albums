const fs = require('fs');
const template = require('../config/template');

function createTweets(arr) {
  return arr.map((elem, i) => template(Object.assign({}, elem, { i })));
}

function saveTweets(arr) {
  fs.writeFile(
    'src/config/export.md',
    arr.join('\n'),
    { flag: 'wx' },
    (err) => {
      if (err) {
        throw err;
      }

      console.log('The file was saved!');
    },
  );
}

module.exports = {
  createTweets,
  saveTweets,
};
