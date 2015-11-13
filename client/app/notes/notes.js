// Create IIFE for the Notes page.
(function() {
  // Add a notes module to the main notely module.
  angular.module('notely.notes', [
    'ui.router',
    'textAngular'
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
            notesLoaded: ['$state', '$q', '$timeout', 'NotesService', 'CurrentUser',
              // Add authentication to the /notes root.
              // $q is an angular service, used to return custom promises.
              // **REMEMBER: Anything that calls a function that returns a promise can have .then(). <-- asynchronous.
              function($state, $q, $timeout, NotesService, CurrentUser) {
                // Get the deferred API.
                let deferred = $q.defer();
                $timeout(function() {
                  // User must be signed in.
                  if (CurrentUser.isSignedIn()) {
                    // Get all notes.
                    NotesService.fetch().then(
                      function() {
                        // Success, resolve the promise.
                        // The .then(success) will get called after return.
                        deferred.resolve();
                      },
                      function() {
                        // Failed, reject the promise.
                        // The .then(error) will get called after return.
                        deferred.reject();
                        $state.go('sign-in');
                      }
                    );
                  }
                  else {
                    // Failed, reject the promise.
                    deferred.reject();
                    $state.go('sign-in');
                  }
                });
                // Send the promise back to calling function.
                return deferred.promise;
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
      $scope.save = function() {
          // Decide whether to call create or update.
          if ($scope.note._id) {
            // Update an existing note.
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
            }
            else {
              console.log('cannot save note!');
            }
          }
      };

      $scope.delete = function() {
        // Delete the note.
        NotesService.delete($scope.note)
          .then(function(response) {
            $state.go('notes.form', { noteId: undefined });
          });
      };

      $scope.buttonText = function() {
        return $scope.note._id ? 'Save Changes' : 'Save';
      };
    }

// Invoke the function.
})();
