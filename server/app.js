
var express = require('express');
// Get the result of invoking express server.
var app = express();
//
app.use(function(request, response, next) {
  // Add a response header to allow access to all request senders, CORS.
  response.header('Access-Control-Allow-Origin', '*');
  // Continue on to the next action.
  next();
});

// Note model.
var Note = require('./models/Note');

//
app.get('/notes', function(request, response) {
  // Use Model.find() to retrieve objects from a MongoDB collection.
  Note.find().then(function(notes) {
    // Set the response to the array of notes returned from the collection.
    response.json(notes);
  });
});
// Have the express server app start listening on a specified port.
app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
