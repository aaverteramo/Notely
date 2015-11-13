var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = function(request, respose, next) {
  // Get Authorization header from the request.
  var authToken = request.headers.authorization;
  var isLoggingInOrRegistering = request.body.user;
  // Check if there is an authToken and if the user is logging in or registering (user object is passed in the request).
  console.log('authToken: ' + authToken);
  console.log('isLoggingInOrRegistering: ' + isLoggingInOrRegistering);
  if (authToken && !isLoggingInOrRegistering) {
    // Decode user ID from JWT token, and find user.
    jwt.verify(authToken, process.env.JWT_SECRET,
      function(error, decodedId) {
        if (decodedId) {
          console.log('decodedId for User: ' + decodedId);
          // Add the user to the request.
          User.findOne({ _id: decodedId })
            .then(function(user) {
              // Set the user.
              request['user'] = user;
              // Continue to the next action.
              next();
            });
        }
        else {
          // Send unauthorized response.
          respose.sendStatus(401);
        }
      });
  }
  else {
    next();
  }
};
