const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const songRoutes = require("./routes/song");

mongoose.connect(
  "mongodb+srv://vvaldez626:admin@wdc028-course-booking.0r6u7.mongodb.net/test_db?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas.")
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/songs", songRoutes);

app.listen(4000, () => {
  console.log(`API is now online on port 4000`);
});
