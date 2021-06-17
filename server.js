const express = require('express'); // require the express package
const app = express(); // initialize your express app instance

const cors = require('cors');
const weatherdata = require('./data/weather.json');
const axios = require('axios');
const { response } = require('express');

app.use(cors()); // after you initialize your express app instance
// a server endpoint
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const MOVIE_KEY = process.env.MOVIE_KEY;

app.get('/test', (req, res) => {
  let str = 'hello from back end ';
  res.send(str);
});

app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  if (lat && lon) {
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
    axios
      .get(weatherBitUrl)
      .then((response) => {
        const resposeData = response.data.data.map((obj) => new Weather(obj));
        res.json(resposeData);
      })
      .catch((error) => {
        res.send('error message', error.message);
      });
  } else {
    res.send('Please Enter Proper Lat &Lon ');
  }
});

app.get('/movies', (req, res) => {
  let cityName = req.query.query;
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&query=${cityName}`
    )
    .then((response) => {
      const arrOfMovies = [];
      response.data.results.map((item) => {
        let imageURL = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        let movieObject = new Movie(
          item.title,
          item.overview,
          item.vote_average,
          item.vote_count,
          imageURL,
          item.popularity,
          item.release_date
        );
        arrOfMovies.push(movieObject);
      });
      res.send(arrOfMovies);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

class Weather {
  constructor(weatherdata) {
    this.description = weatherdata.weather.description;
    this.date = weatherdata.valid_date;
  }
}
class Movie {
  constructor(
    title,
    overview,
    average_votes,
    total_votes,
    image_url,
    popularity,
    released_on
  ) {
    this.title = title;
    this.overview = overview;
    this.average_votes = average_votes;
    this.total_votes = total_votes;
    this.image_url = image_url;
    this.popularity = popularity;
    this.released_on = released_on;
  }
}

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
}); // kick start the express server to work
