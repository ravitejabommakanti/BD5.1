const express = require('express');
const { resolve } = require('path');
let { track } = require("./models/track.model");
let { sequelize } = require("./lib/index");
const { where } = require('sequelize');

const app = express();
const port = 3000;

app.use(express.static('static'));

let movieData = [
  {
    "id": 1,
    "name": "Shape of You",
    "genre": "Pop",
    "release_year": 2017,
    "artist": "Ed Sheeran",
    "album": "Divide",
    "duration": 233
  },
  {
    "id": 2,
    "name": "Bohemian Rhapsody",
    "genre": "Rock",
    "release_year": 1975,
    "artist": "Queen",
    "album": "A Night at the Opera",
    "duration": 354
  },
  {
    "id": 3,
    "name": "Blinding Lights",
    "genre": "Synth-pop",
    "release_year": 2019,
    "artist": "The Weeknd",
    "album": "After Hours",
    "duration": 200
  },
  {
    "id": 4,
    "name": "Hotel California",
    "genre": "Rock",
    "release_year": 1976,
    "artist": "Eagles",
    "album": "Hotel California",
    "duration": 390
  },
  {
    "id": 5,
    "name": "Rolling in the Deep",
    "genre": "Soul",
    "release_year": 2010,
    "artist": "Adele",
    "album": "21",
    "duration": 228
  },
  {
    "id": 6,
    "name": "Billie Jean",
    "genre": "Pop",
    "release_year": 1983,
    "artist": "Michael Jackson",
    "album": "Thriller",
    "duration": 293
  },
  {
    "id": 7,
    "name": "Smells Like Teen Spirit",
    "genre": "Grunge",
    "release_year": 1991,
    "artist": "Nirvana",
    "album": "Nevermind",
    "duration": 301
  },
  {
    "id": 8,
    "name": "Someone Like You",
    "genre": "Soul",
    "release_year": 2011,
    "artist": "Adele",
    "album": "21",
    "duration": 285
  },
  {
    "id": 9,
    "name": "Imagine",
    "genre": "Soft Rock",
    "release_year": 1971,
    "artist": "John Lennon",
    "album": "Imagine",
    "duration": 183
  },
  {
    "id": 10,
    "name": "Uptown Funk",
    "genre": "Funk",
    "release_year": 2014,
    "artist": "Mark Ronson ft. Bruno Mars",
    "album": "Uptown Special",
    "duration": 269
  }
]


app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await track.bulkCreate(movieData);
    res.status(200).json({ message: "DB has successfully Seeded" });
  } catch (error) {
    res.status(500).json({ message: "Error seeding the data", error: error });
  }
});

async function fetchAllTracks() {
  let tracks = await track.findAll();
  return {tracks};
}

app.get("/tracks", async (req, res) => {
  try {
    let response = await fetchAllTracks();
    if (response && response.tracks.length === 0) {
      res.status(200).json({ message: "No tracks found in the DB" });
    } else {
      res.status(200).json(response)
    }

  } catch (error) {
    res.status(500).json({ message: "Unable to get tracks from DB", error: error });
  }
});

async function getTrackById(id){
  let data = await track.findOne({where :{id}})
  return {track:data};
}

app.get("/tracks/details/:id", async(req,res)=>{
  let trackId =  parseInt(req.params.id);
  try {
    let response = await getTrackById(trackId);
    console.log(response);
    if (response && response.track === null) {
      res.status(200).json({ message: "No tracks found in the DB with id "+ trackId});
    } else {
      res.status(200).json(response)
    }
    
  } catch (error) {
    res.status(500).json({ message: "Unable to get track with id" + trackId, error: error });
  }
});

async function getTracksByArtist(artist){
  let tracks = await track.findAll({where:{artist}});
  return {tracks}
}

app.get("/tracks/artists/:artist", async(req,res)=>{
  let artist =  req.params.artist;
  try {
    let response = await getTracksByArtist(artist);
    console.log(response);
    if (response && response.tracks.length === 0) {
      res.status(200).json({ message: "No tracks found in the DB with artist "+ artist});
    } else {
      res.status(200).json(response)
    }
    
  } catch (error) {
    res.status(500).json({ message: "Unable to get track with artist" + artist, error: error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
