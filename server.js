const express = require('express'); // require the express package
const app = express(); // initialize your express app instance

const cors = require('cors');
const weatherdata = require('./data/weather.json');

app.use(cors()); // after you initialize your express app instance
// a server endpoint
require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.get('/test', (req, res) => {
  let str = 'hello from back end ';
  res.send(str);
});

app.get('/weather', (req, res) => {
  const resposeData = weatherdata.data.map((obj) => new Weather(obj));
  res.json(resposeData);
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
