// Get the MongoDB
var db = require('mongoose');
// Connect to the database, use the environment variable that is loaded for the app.
db.connect(process.env.DB_URI);
// Allow the db to be returned when calling require('thisfile.js')
module.exports = db;
