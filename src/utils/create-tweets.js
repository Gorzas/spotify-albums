const template = require('../config/template');

function createTweets(arr) {
  return arr.map((elem, i) => template(Object.assign({}, elem, { i })));
}

module.exports = createTweets;
