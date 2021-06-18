const axios = require('axios');
const Movie = require('../model/movies.model');
require('dotenv').config();
const MOVIE_KEY = process.env.MOVIE_KEY;
const Cache = require('../helper/Cache');
const cacheObj = new Cache();
const moviesController = (req, res) => {
  let cityName = req.query.query;
  const moviesKey = `movies=${cityName}`;
  if (cacheObj[moviesKey]) {
    res.send(cacheObj[moviesKey]);
  } else {
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
        cacheObj[moviesKey] = arrOfMovies;
        res.send(arrOfMovies);
      })
      .catch((error) => {
        res.send(error.message);
      });
  }
};

module.exports = moviesController;
