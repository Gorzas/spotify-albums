const parseCSV = require('./utils/parse-csv');
const getAlbums = require('./utils/get-albums');

async function app() {
  try {
    const data = await parseCSV(
      'src/config/albums.csv',
      ['artist', 'album'],
    );

    console.log(await getAlbums(data));
  } catch (e) {
    console.log(e);
  }
}

module.exports = app;
