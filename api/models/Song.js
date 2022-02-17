const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Song title is required"],
  },
  artist: {
    type: String,
    required: [true, "Song artist is required"],
  },
  lyrics: {
    type: String,
    required: [true, "Song lyrics are required"],
  },
  addedOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Song", songSchema);
