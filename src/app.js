const parseCSV = require('./utils/parse-csv');
const getAlbums = require('./utils/get-albums');
const {
  createTweets,
  saveTweets,
} = require('./utils/create-tweets');

async function app() {
  try {
    const data = await parseCSV(
      'src/config/albums.csv',
      ['artist', 'album', 'twitter', 'url'],
    );

    saveTweets((createTweets(await getAlbums(data))));
  } catch (e) {
    console.log(e);
  }
}

module.exports = app;
