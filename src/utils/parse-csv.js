const csv = require('csv');
const fs = require('fs');

function parseCSV(dir, columns = []) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(dir)
      .pipe(csv.parse((err, data) => {
        if (data.length) {
          resolve(data.map(values => columns.reduce(
            (prev, col, i) => Object.assign({}, prev, { [col]: values[i] }),
            {},
          )));
        } else {
          reject();
        }
      }));
  });
}

module.exports = parseCSV;
