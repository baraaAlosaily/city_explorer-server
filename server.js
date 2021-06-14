const express = require('express'); // require the express package
const app = express(); // initialize your express app instance

const cors = require('cors');

app.use(cors()); // after you initialize your express app instance
// a server endpoint
require('dotenv').config();

const port = process.env.PORT || 3000;
app.get('/', function (req, res) {
  // callback function of what we should do with our request
  res.send('Hello World'); // our endpoint function response
});

app.listen(port, () => {
  console.log(`Up and running on PORT ${port}`);
}); // kick start the express server to work
