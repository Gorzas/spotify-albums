const parseCSV = require('./utils/parse-csv');

async function app() {
  try {
    const data = await parseCSV(
      'src/config/albums.csv',
      ['artist', 'album'],
    );

    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

module.exports = app;
