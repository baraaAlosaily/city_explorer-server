const express = require('express'); // require the express package
const app = express(); // initialize your express app instance
const cors = require('cors');
const weatherController = require('./controller/waether.controller');
const moviesController = require('./controller/movies.controller');
app.use(cors()); // after you initialize your express app instance
// a server endpoint
require('dotenv').config();

const PORT = process.env.PORT || 4000;
app.get('/test', (req, res) => {
  let str = 'hello from back end ';
  res.send(str);
});

app.get('/weather', weatherController);

app.get('/movies', moviesController);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
}); // kick start the express server to work
