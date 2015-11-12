var db = require('../config/db');
var UserSchema = require('./user-schema');

// Create a model with the defined Schema.
// Pass the singular name of the MongoDB collection object. (e.g. collection = notes, model = note)
var User = db.model('User', UserSchema);

// Allow the model to be returned when calling require('thisfile.js')
module.exports = User;
