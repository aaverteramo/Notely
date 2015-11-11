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
    notesConfig.$inject = ['$stateProvider'];
    // Configure the notes controller.
    function notesConfig($stateProvider) {
      $stateProvider
        // State is similar to a URL / Page / Route
        // Notes - #/notes
        .state('notes', {
          url: '/notes',
          // Provide a function to run before the controller is loaded.
          // If any of the functions in 'resolve' returns a promise, that promise must be resolved before continuing on.
          resolve: {
            // Define the action to complete before continuing on to the Controller.
            // Inject arguments into the function using array annotation.
            notesLoaded: ['NotesService', function(NotesService) {
              // Get all notes.
              return NotesService.fetch();
            }]
          },
          // Template replaces contents of the object containing the ui-view attribute.
          templateUrl: '/notes/notes.html',
          // Set the controller for this state.
          controller: NotesController
        })
        // Create a child-state for the notes form.
        .state('notes.form', {
          // Use /: to define parameters.
          url: '/:noteId',
          templateUrl: '/notes/notes-form.html',
          controller: NotesFormController
        })
    }

    // Define the NotesController
    NotesController.$inject = ['$state', '$scope', 'NotesService'];
    function NotesController($state, $scope, NotesService) {
      $scope.note = {};
      // Callback function should get the result of the async service method.
      // Set a $scope vairable to the result;
      $scope.notes = NotesService.get();
    }

    // Create the NotesFormController
    NotesFormController.$inject = ['$scope', '$state', 'NotesService'];
    function NotesFormController($scope, $state, NotesService) {
      // Use the $state.params to get all params declared in the .state definitions.
      $scope.note = NotesService.findById($state.params.noteId);

      // Create a function used to save the model.
      $scope.saveNote = function() {
          // Decide whether to call create or update.
          if ($scope.note._id) {
            // Update an existing note.
            console.log('Need to update the note.');
            NotesService.update($scope.note)
              .then(function(response) {
                // Reset the $scope.note so we have the scrubbed body_html.
                $scope.note = angular.copy(response.data.note);
              });
          }
          else {
            if ($scope.note.title && $scope.note.body_html) {
              // Create the note.
              NotesService.create($scope.note)
                .then(function(response) {
                  $state.go('notes.form', { noteId: response.data.note._id });
                });
              console.log('saved note!');
            }
            else {
              console.log('cannot save note!');
            }
          }
      };
    }

// Invoke the function.
})();
