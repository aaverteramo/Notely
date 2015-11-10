
var express = require('express');
// Get the result of invoking express server.
var app = express();
//
app.use(function(request, response, next) {
  // Add a response header to allow access to all request senders, CORS.
  response.header('Access-Control-Allow-Origin', '*');
  // Allow methods.
  //response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // Continue on to the next action.
  next();
});

//
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Note model.
var Note = require('./models/Note');

// Get notes.
app.get('/notes', function(request, response) {
  // Use Model.find() to retrieve objects from a MongoDB collection.
  Note.find().then(function(notes) {
    // Set the response to the array of notes returned from the collection.
    response.json(notes);
  });
});
// Create a new note.
app.post('/notes', function(request, response) {
  // Create a new Note object from the request body.
  var note = new Note({
    title: request.body.note.title,
    body_html: request.body.note.body_html
  });
  // MongoDB knows to save the note to the collection.
  note.save()
    .then(function(noteData) {
      response.json({
        message: 'Saved!',
        note: noteData
      })
    });
});
// Have the express server app start listening on a specified port.
app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
