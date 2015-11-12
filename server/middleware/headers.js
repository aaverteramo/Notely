// Add a response header to allow access to all request senders, CORS.
module.exports = function(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  // Allow methods.
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // Continue on to the next action.
  next();
};
