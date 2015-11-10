var db = require('../config/db');
var NoteSchema = require('./note-schema');

// Create a model with the defined Schema.
// Pass the singular name of the MongoDB collection object. (e.g. collection = notes, model = note)
var Note = db.model('Note', NoteSchema);

// Allow the model to be returned when calling require('thisfile.js')
module.exports = Note;
