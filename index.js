const express = require('express');
const { resolve } = require('path');
let { track } = require("./models/track.model");
let { sequelize } = require("./lib/index");

const app = express();
const port = 3000;

app.use(express.static('static'));

let movieData = [
  {
    "name": "Shape of You",
    "genre": "Pop",
    "release_year": 2017,
    "artist": "Ed Sheeran",
    "album": "Divide",
    "duration": 233
  },
  {
    "name": "Bohemian Rhapsody",
    "genre": "Rock",
    "release_year": 1975,
    "artist": "Queen",
    "album": "A Night at the Opera",
    "duration": 354
  },
  {
    "name": "Blinding Lights",
    "genre": "Synth-pop",
    "release_year": 2019,
    "artist": "The Weeknd",
    "album": "After Hours",
    "duration": 200
  },
  {
    "name": "Hotel California",
    "genre": "Rock",
    "release_year": 1976,
    "artist": "Eagles",
    "album": "Hotel California",
    "duration": 390
  },
  {
    "name": "Rolling in the Deep",
    "genre": "Soul",
    "release_year": 2010,
    "artist": "Adele",
    "album": "21",
    "duration": 228
  },
  {
    "name": "Billie Jean",
    "genre": "Pop",
    "release_year": 1983,
    "artist": "Michael Jackson",
    "album": "Thriller",
    "duration": 293
  },
  {
    "name": "Smells Like Teen Spirit",
    "genre": "Grunge",
    "release_year": 1991,
    "artist": "Nirvana",
    "album": "Nevermind",
    "duration": 301
  },
  {
    "name": "Someone Like You",
    "genre": "Soul",
    "release_year": 2011,
    "artist": "Adele",
    "album": "21",
    "duration": 285
  },
  {
    "name": "Imagine",
    "genre": "Soft Rock",
    "release_year": 1971,
    "artist": "John Lennon",
    "album": "Imagine",
    "duration": 183
  },
  {
    "name": "Uptown Funk",
    "genre": "Funk",
    "release_year": 2014,
    "artist": "Mark Ronson ft. Bruno Mars",
    "album": "Uptown Special",
    "duration": 269
  }
];


app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await track.bulkCreate(movieData);
    res.status(200).json({ message: "DB has successfully Seeded" });
  } catch (error) {
    res.status(500).json({ message: "Error seeding the data", error: error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
