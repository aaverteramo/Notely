// IFFE for our notely application.
(function() {
  // Inject dependancy for ui.router into the notely application / module.
  // ** Array of other modules to include.
  var app = angular.module('notely', [
    'ui.router',
    'notely.notes',
    'flash'
  ]);

  function config($urlRouterProvider) {
    // If request does not find a valid page, route to '/notes'
    $urlRouterProvider.otherwise('/notes/');
  }

  config['$inject'] = ['$urlRouterProvider'];
  app.config(config);
  // Add an API_BASE constant to the app to represent the main server url.
  app.constant('API_BASE', 'http://localhost:3000/api/v1/');
// Invoke the function.
})();
