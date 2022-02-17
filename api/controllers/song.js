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
      return error;
    } else {
      return "New Song Added";
    }
  });
};

//Get all songs
module.exports.getAll = () => {
  return Song.find({}).then((result) => {
    return result;
  });
};

//update song info
module.exports.updateSong = (reqParams, reqBody) => {
  let updatedSong = {
    title: reqBody.title,
    artist: reqBody.artist,
    lyrics: reqBody.lyrics,
  };
  return Song.findByIdAndUpdate(reqParams.id, updatedSong).then(
    (song, error) => {
      if (error) {
        return error;
      } else {
        return "Song was updated";
      }
    }
  );
};

//delete song
module.exports.deleteSong = (reqParams) => {
  return Song.findByIdAndDelete(reqParams.id).then((song, error) => {
    if (error) {
      return error;
    } else {
      return "Song was deleted";
    }
  });
};
