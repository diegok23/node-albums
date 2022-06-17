const express = require('express');
const app = express();
const api = require('./api');

const myLogger = (req, res, next) => {
  const log = {
    date: new Date(),
    url: req.url
  };
  console.log(JSON.stringify(log, null, 2));
  next();
};

// FUNCTIONS

// MIDDLEWARES
app.use(myLogger);
app.use(express.json());
app.get('/albums', api.getAlbumsAll);
app.get('/albums/:albumId', api.getAlbumById);
app.post('/albums', api.postAlbum);
app.put('/albums/:albumId', api.putAlbum);
app.delete('/albums/:albumId', api.deleteAlbum);

// SERVER
const port = 3000;
const url = `http://localhost:${port}/albums`;
app.listen(port, () => console.log(`Listening on port ${url}`));
