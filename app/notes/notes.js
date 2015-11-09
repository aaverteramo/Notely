// Create IIFE for the Notes page.
(function() {
  // Add a notes module to the main notely module.
  angular.module('notely.notes', [
    'ui.router'
  ])
    //// Create the notes controller.
    //.controller('NotesController', NotesController)
    // Configure the controller.
    .config(notesConfig);

    // Assign array of all things to be injected into the notesConfig function.
    // ** Do this to allow minification of our .js
    notesConfig['$inject'] = ['$stateProvider'];
    // Configure the notes controller.
    function notesConfig($stateProvider) {
      $stateProvider
        // State is similar to a URL / Page
        // Notes - #/notes
        .state('notes', {
          url: '/notes',
          // Template replaces contents of the object containing the ui-view attribute.
          template: '<h1>Notely</h1><p>{{ message }}</p>',
          //templateUrl: '[URL of local .html file]',
          controller: NotesController
        });
    }

    NotesController['$inject'] = ['$scope'];
    // Define the NotesController
    function NotesController($scope) {
      $scope.message = "I <3 Angular!";
    }

// Invoke the function.
})();
