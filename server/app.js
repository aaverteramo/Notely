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

//
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Note model.
var Note = require('./models/Note');

// Get notes.
app.get('/notes', function(request, response) {
  // Use Model.find() to retrieve objects from a MongoDB collection.
  // Add .sort({ attribute: [-]1 }) to return an ordered array by the attribute.
  Note.find().sort({ updated_at: 'desc' }).then(function(notes) {
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
// Update an existing note.
app.put('/notes/:id', function(request, response) {
  // Find the one document in the MongoDB collection.
  Note.findOne({ _id: request.params.id })
    // The promise returned has a note if a note is found.
    // Replace returned note with attribute values from the request note object.
    .then(function(note) {
      note.title = request.body.note.title;
      note.body_html = request.body.note.body_html;
      // Save the note.
      note.save()
        .then(function() {
          response.json({
            messge: 'Your changes have been saved.',
            note: note
          })
        })
    });
});
// Delete an existing note.
app.delete('/notes/:id', function(request, response) {
  // Find the one document in the MongoDB collection.
  Note.findOne({ _id: request.params.id })
    // The promise returned has a note if a note is found.
    // Remove the note from the collection.
    .then(function(note) {
      // Remove the note.
      note.remove()
        .then(function() {
          response.json({
            messge: 'Your note has been removed.'
          })
        })
    });
});
// Have the express server app start listening on a specified port.
app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
  console.log(process.env.DB_URI);
});
