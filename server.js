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
        res.send(error.message);
      });
  } else {
    res.send('Please Enter Proper Lat &Lon ');
  }
});

class Weather {
  constructor(weatherdata) {
    this.description = weatherdata.weather.description;
    this.date = weatherdata.valid_date;
  }
}

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
}); // kick start the express server to work
