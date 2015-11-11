var db = require('../config/db');
var sanitizeHtml = require('sanitize-html');
var htmlToText = require('html-to-text');

// Define a Schema.
var NoteSchema = db.Schema({
  title: String,
  body_html: String,
  body_text: String,
  updated_at: { type: Date, default: Date.now() }
});
// Define pre-execution steps for the specified method.
NoteSchema.pre('save', function(next) {  
  this.body_html = sanitizeHtml(this.body_html);
  this.body_text = htmlToText.fromString(this.body_html);
  this.updated_at = Date.now();
  // Continue on with the next action.
  next();
});
// Allow the Schema to be returned when calling require('thisfile.js')
module.exports = NoteSchema;
