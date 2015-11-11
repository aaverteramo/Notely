// IFFE for our notely application.
(function() {
  // Inject dependancy for ui.router into the notely application / module.
  // ** Array of other modules to include.
  var app = angular.module('notely', [
    'ui.router',
    'notely.notes'
  ]);

  function config($urlRouterProvider) {
    // If request does not find a valid page, route to '/notes'
    $urlRouterProvider.otherwise('/notes/');
  }

  config['$inject'] = ['$urlRouterProvider'];
  app.config(config);
// Invoke the function.
})();
