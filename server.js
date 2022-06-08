const express = require('express');
const app = express();
const fs = require('fs');
const file = 'albums.json';

function getAlbums() {
  const text = fs.readFileSync(file);
  return JSON.parse(text);
}

function saveAlbums(arr) {
  fs.writeFileSync(file, JSON.stringify(arr, null, 2));
}

const myLogger = (req, res, next) => {
  const log = {
    date: new Date(),
    url: req.url
  };
  console.log(JSON.stringify(log, null, 2));
  next();
};

// FUNCTIONS
const getAlbumsAll = (req, res) => {
  const albums = getAlbums();
  res.send(albums);
};

const getAlbumById = (req, res) => {
  const albums = getAlbums();
  const id = Number(req.params.albumId);
  const album = albums.find((album) => album.albumId === id);
  res.send(album);
};

const postAlbum = (req, res) => {
  const newAlbum = req.body;
  const albums = getAlbums();
  albums.push(newAlbum);
  saveAlbums(albums);
  res.send({ success: true });
};

const putAlbum = (req, res) => {
  const modifiedAlbum = req.body;
  const albums = getAlbums();
  const id = Number(req.params.albumId);
  const album = albums.find((album) => album.albumId === id);
  album.artistName = modifiedAlbum.artistName;
  album.collectionName = modifiedAlbum.collectionName;
  album.artworkUrl100 = modifiedAlbum.artworkUrl100;
  album.releaseDate = modifiedAlbum.releaseDate;
  album.primaryGenreName = modifiedAlbum.primaryGenreName;
  album.url = modifiedAlbum.url;
  saveAlbums(albums);
  res.send({ success: true });
};

const deleteAlbum = (req, res) => {
  let albums = getAlbums();
  const id = Number(req.params.albumId);
  const findAlbumId = albums.find((album) => album.albumId === id);
  if (findAlbumId) {
    albums = albums.filter((album) => album.albumId !== id);
    saveAlbums(albums);
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
};

// MIDDLEWARES
app.use(myLogger);
app.use(express.json());
app.get('/albums', getAlbumsAll);
app.get('/albums/:albumId', getAlbumById);
app.post('/albums', postAlbum);
app.put('/albums/:albumId', putAlbum);
app.delete('/albums/:albumId', deleteAlbum);

// SERVER
const port = 3001;
const url = `http://localhost:${port}/albums`;
app.listen(port, () => console.log(`Listening on port ${url}`));
