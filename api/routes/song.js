const express = require("express");
const router = express.Router();
const songController = require("../controllers/song");

router.post("/newSong", (req, res) => {
  songController.addSong(req.body).then((result) => res.send(result));
});

module.exports = router;
