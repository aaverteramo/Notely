// Get the router from the express server.
var router = require('express').Router();
var Note = require('../models/note');

// Get notes.
router.get('/', function(request, response) {
  // Use Model.find() to retrieve objects from a MongoDB collection.
  // Add .sort({ attribute: [-]1 }) to return an ordered array by the attribute.
  Note.find().sort({ updated_at: 'desc' }).then(function(notes) {
    // Set the response to the array of notes returned from the collection.
    response.json(notes);
  });
});
// Create a new note.
router.post('/', function(request, response) {
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
router.put('/:id', function(request, response) {
  // Find the one document in the MongoDB collection.
  Note.findOne({ _id: request.params.id })
    // The promise returned has a document if a note is found.
    // Replace returned document model with attribute values from the request body object.
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
router.delete('/:id', function(request, response) {
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
// Expose the express router through the 'require' function.
module.exports = router;
