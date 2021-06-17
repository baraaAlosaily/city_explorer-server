class Weather {
  constructor(weatherdata) {
    this.description = weatherdata.weather.description;
    this.date = weatherdata.valid_date;
  }
}

module.exports = Weather;
