// Load environment variables.
require('dotenv').load();
var express = require('express');
// Get the result of invoking express server.
var app = express();
//
app.use(function(request, response, next) {
  // Add a response header to allow access to all request senders, CORS.
  response.header('Access-Control-Allow-Origin', '*');
  // Allow methods.
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // Continue on to the next action.
  next();
});

// Set the root path of the notes router.
app.use('/api/v1/notes', require('./routes/notes'));

//
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Note model.
var Note = require('./models/Note');


// Have the express server app start listening on a specified port.
app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
  console.log(process.env.DB_URI);
});
