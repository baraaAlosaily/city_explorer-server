const axios = require('axios');
const Weather = require('../model/weather.model');
require('dotenv').config();
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const weatherController = (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  if (lat && lon) {
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
    console.log(weatherBitUrl);
    axios
      .get(weatherBitUrl)
      .then((response) => {
        const resposeData = response.data.data.map((obj) => new Weather(obj));
        res.status(200).json(resposeData);
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  } else {
    res.send('Please Enter Proper Lat &Lon ');
  }
};

module.exports = weatherController;
