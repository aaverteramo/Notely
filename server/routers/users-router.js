// Get the router from the express server.
var router = require('express').Router();
var User = require('../models/user');
// // Get an existing user: authenticate.
// router.get('/', function(request, response) {
//   // // Createa a new model object from the request body.
//   // var user = new User({
//   //   username: request.body.user.username,
//   //   password: request.body.user.password
//   // });
//   // Find the single instance of this username and password combination.
//   User.findOne({
//     username: request.body.user.username,
//     password: request.body.user.password
//   })
//     // The promise returned has a document if a note is found.
//     // Replace returned document model with attribute values from the request body object.
//     .then(function(user) {
//       // Return the authenticated user.
//       response.json(user);
//     });
// });
// Create a new note.
router.post('/', function(request, response) {
  // Create a new model object from the request body.
  var user = new User({
    username: request.body.user.username,
    name: request.body.user.name
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
        user: userData
      })
    });
});
// Expose the express router through the 'require' function.
module.exports = router;
