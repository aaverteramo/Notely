var db = require('../config/db');

// Define a Schema.
var NoteSchema = db.Schema({
  title: String,
  body_html: String,
  body_text: String,
  updated_at: { type: Date, default: Date.Now }
});
// Allow the Schema to be returned when calling require('thisfile.js')
module.exports = NoteSchema;
