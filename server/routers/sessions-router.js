// Get the router from the express server.
var router = require('express').Router();
//var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
// Post the user form data to recieve a session login.
router.post('/', function(request, response) {
  console.log(request.body.user.username);
  console.log(request.body.user.password);
  // Find the single instance of this username.
  User.findOne({
    username: request.body.user.username
  })
    // The promise returned has a document if a note is found.
    // Replace returned document model with attribute values from the request body object.
    .then(function(user) {
      if (user) {
        user.authenticate(request.body.user.password, function(isMatch){
          if (isMatch) {
            response.json({
              message: 'Welcome back!',
              user: user,
              // Generate an authentication token.
              // Set it to expire every day.
              auth_token: jwt.sign(user._id, process.env.JWT_SECRET, {
                // Number of seconds for token to expire.
                expiresIn: 60*60*24
              })
            });
          }
          else {
            // Passwords don't match.
            response.send(500, { message: 'We were unable to log you in with those credentials.' });
          }
        });
      }
      else {
        // Couldn't find a user by that username.
        response.send(500, { message: 'We were unable to log you in with those credentials.' });
      }
    });
});

module.exports = router;
