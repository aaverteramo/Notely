// Create IIFE for the Notes page.
(function() {
  // Add a notes module to the main notely module.
  angular.module('notely.notes', [
    'ui.router'
  ])
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
          templateUrl: '/notes/notes.html',
          // Set the controller for this state.
          controller: NotesController
        })
        // Create a child-state for the notes form.
        .state('notes.form', {
          // Use /: to define parameters.
          url: '/:noteId',
          templateUrl: '/notes/notes-form.html'
        })
    }

    // Define the NotesController
    NotesController['$inject'] = ['$state', '$scope', 'NotesService'];
    function NotesController($state, $scope, NotesService) {
      // Initialize the [edit] note model.
      $scope.note = {};
      // Create a function used to save the model.
      $scope.saveNote = function() {
        if ($scope.note.title != null && $scope.note.body_html != null) {
          // Save the note.
          NotesService.save($scope.note);
          // Reinitialize the [edit] note model.
          $scope.note = {};
          console.log('saved note!');
        } else {
          console.log('cannot save note!');
        }
      };

      // Call the service method - returns a promise.
      NotesService.fetch()
        .then(function() {
        // Callback function should get the result of the async service method.
        // Set a $scope vairable to the result;
        $scope.notes = NotesService.get();
        //console.log($scope.notes);
      });
      $state.go('notes.form');
    }

// Invoke the function.
})();
