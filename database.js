const fs = require('fs');
const file = 'albums.json';

function getAlbums() {
  const text = fs.readFileSync(file);
  return JSON.parse(text);
}

function saveAlbums(arr) {
  fs.writeFileSync(file, JSON.stringify(arr, null, 2));
}

module.exports = {
  getAlbums,
  saveAlbums
};
