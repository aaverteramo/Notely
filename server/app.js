// Load environment variables.
require('dotenv').load();
var express = require('express');
// Get the result of invoking express server.
var app = express();
// Get a body parser.
var bodyParser = require('body-parser');
// Instruct the app to use the body parser.
app.use(bodyParser.json());
// Use all functions exposed in the headers.js file.
app.use(require('./middleware/headers'));
// Use custom routers.
app.use('/api/v1/notes', require('./routers/notes-router'));
app.use('/api/v1/users', require('./routers/users-router'));
// Have the express server app start listening on a specified port.
app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
  console.log(process.env.DB_URI);
});
