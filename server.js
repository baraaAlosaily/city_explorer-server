const express = require('express'); // require the express package
const app = express(); // initialize your express app instance

const cors = require('cors');
const weatherdata = require('./data/weather.json');

app.use(cors()); // after you initialize your express app instance
// a server endpoint
require('dotenv').config();

const port = process.env.PORT || 3000;

app.get('/test', (req, res) => {
  let str = 'hello from back end ';
  res.send(str);
});

class Forcast {
  constructor(object) {
    this.description = `low of: ${object.low_temp} and high of ${object.max_temp} with a ${object.weather.description}`;
    this.date = object.valid_date;
  }
}
app.get('/weather', (req, res) => {
  const latitude = req.query.lat;
  const longitude = req.query.lon;
  const weatherArray = weatherdata.find((item) => {
    if ((latitude == item.lon && longitude == item.lat) || item.city_name) {
      return item;
    }
  });
  try {
    let forcast = weatherArray.data.map((item) => {
      return new Forcast(item);
    });
    res.send(forcast);
  } catch {
    res.status(404).send('OPPS');
  }
});

app.listen(port, () => {
  console.log(`Up and running on PORT ${port}`);
}); // kick start the express server to work
