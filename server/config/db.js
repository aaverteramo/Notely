// Get the MongoDB
var db = require('mongoose');
// Connect to the database.
db.connect('mongodb://mongo:password@ds053148.mongolab.com:53148/notelydb');
// Allow the db to be returned when calling require('thisfile.js')
module.exports = db;
