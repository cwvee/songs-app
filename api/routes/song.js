const express = require("express");
const router = express.Router();
const songController = require("../controllers/song");

//add new song
router.post("/newSong", (req, res) => {
  songController.addSong(req.body).then((result) => res.send(result));
});

//get all songs
router.get("/all", (req, res) => {
  songController.getAll().then((result) => res.send(result));
});

router.get("/:id", (req, res) => {
  songController.getOneSong(req.params).then((result) => res.send(result));
});
//update song info
router.put("/updateSong/:id", (req, res) => {
  songController
    .updateSong(req.params, req.body)
    .then((result) => res.send(result));
});

//delete song
router.delete("/deleteSong/:id", (req, res) => {
  songController.deleteSong(req.params).then((result) => res.send(result));
});
module.exports = router;
