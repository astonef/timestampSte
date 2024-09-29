// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Function to check if the date is invalid
const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";

// Endpoint for handling /api/:date
app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date);

  // If the date is invalid, try parsing it as a number
  if (isInvalidDate(date)) {
    date = new Date(parseInt(req.params.date));
  }

  // If still invalid, return the error response
  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  // Return the valid response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Endpoint for handling /api (current date)
app.get('/api', function (req, res) {
  const currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString()
  });
});

// listen for requests
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
