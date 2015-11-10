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
          // use /: to define parameters.
          url: '/:noteId',
          templateUrl: '/notes/notes-form.html'
        })
    }

    NotesController['$inject'] = ['$state'];
    // Define the NotesController
    function NotesController($state) {
      $state.go('notes.form');
    }

// Invoke the function.
})();
