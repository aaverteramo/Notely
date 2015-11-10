
var express = require('express');
// Get the result of invoking express server.
var app = express();

//
app.use(function(request, response, next) {
  // Add a response header to allow access to all request senders.
  response.header('Access-Control-Allow-Origin', '*');
  // Continue on to the next action.
  next();
});

//
app.get('/notes', function(request, response) {
  // Send text.
  //response.send('I <3 Express!');
  // Send Json.
  response.json([
    {
      title: 'Hardcoded note',
      body_html: 'This is the body of my hardcoded note.'
    },
    {
      title: 'Note 2',
      body_html: 'Note text goes here.'
    }
  ])
});
// Have the express server app start listening on a specified port.
app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
