// The "User" variable is defined using a capitalized letter to indicate that what we are using is the "User" model for code readability
const Song = require("../models/Song");

//Add new song
module.exports.addSong = (reqBody) => {
  let newSong = new Song({
    title: reqBody.title,
    artist: reqBody.artist,
    lyrics: reqBody.lyrics,
  });
  return newSong.save().then((user, error) => {
    if (error) {
      return false;
    } else {
      return true;
    }
  });
};
