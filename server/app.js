
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

// Get the MongoDB
var db = require('mongoose');
// Connect to the database.
db.connect('mongodb://mongo:password@ds053148.mongolab.com:53148/notelydb');
// Define a Schema.
var NoteSchema = db.Schema({
  title: String,
  body_html: String,
  body_text: String,
  updated_at: { type: Date, default: Date.Now }
});
// Create a model with the defined Schema.
// Pass the singular name of the MongoDB collection object. (e.g. collection = notes, model = note)
var Note = db.model('Note', NoteSchema);

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
