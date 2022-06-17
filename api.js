const database = require('./database')

const getAlbumsAll = (req, res) => {
    const albums = database.getAlbums();
    res.send(albums);
  };
  
  const getAlbumById = (req, res) => {
    const albums = database.getAlbums();
    const id = Number(req.params.albumId);
    const album = albums.find((album) => album.albumId === id);
    res.send(album);
  };
  
  const postAlbum = (req, res) => {
    const newAlbum = req.body;
    const albums = database.getAlbums();
    albums.push(newAlbum);
    database.saveAlbums(albums);
    res.send({ success: true });
  };
  
  const putAlbum = (req, res) => {
    const modifiedAlbum = req.body;
    const albums = database.getAlbums();
    const id = Number(req.params.albumId);
    const album = albums.find((album) => album.albumId === id);
    album.artistName = modifiedAlbum.artistName;
    album.collectionName = modifiedAlbum.collectionName;
    album.artworkUrl100 = modifiedAlbum.artworkUrl100;
    album.releaseDate = modifiedAlbum.releaseDate;
    album.primaryGenreName = modifiedAlbum.primaryGenreName;
    album.url = modifiedAlbum.url;
    database.saveAlbums(albums);
    res.send({ success: true });
  };
  
  const deleteAlbum = (req, res) => {
    let albums = database.getAlbums();
    const id = Number(req.params.albumId);
    const findAlbumId = albums.find((album) => album.albumId === id);
    if (findAlbumId) {
      albums = albums.filter((album) => album.albumId !== id);
      database.saveAlbums(albums);
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  };

  module.exports = {
    getAlbumsAll,
    getAlbumById,
    postAlbum,
    putAlbum,
    deleteAlbum
  }
