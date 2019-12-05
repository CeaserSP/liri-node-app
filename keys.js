console.log('this is loaded');

exports.spotify = {
  idS: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
exports.omdb = {
    idM: process.env.OMDB_ID
};