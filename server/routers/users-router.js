// Get the router from the express server.
var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
// Create a new note.
router.post('/', function(request, response) {
  // Create a new model object from the request body.
  var user = new User({
    username: request.body.user.username,
    name: request.body.user.name,
    password_digest: bcrypt.hashSync(request.body.user.password)
  });
  // // MongoDB knows to save the note to the collection.
  // response.json({
  //   message: 'MongoDB will eventually save the user!',
  //   user: request.body.user
  // });
  user.save()
    .then(function(userData) {
      response.json({
        message: 'Thanks for signing up!',
        user: userData,
        // Generate an authentication token.
        // Set it to expire every day.
        auth_token: jwt.sign(userData._id, process.env.JWT_SECRET, {
          // Number of seconds for token to expire.
          expiresIn: 60*60*24
        })
      });
    });
});
// Expose the express router through the 'require' function.
module.exports = router;
