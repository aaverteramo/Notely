// Create a service.js to communicate with the server.
// This can be used by multiple controllers to CRUD data.

// Use the existing main module.
angular.module('notely')
  // Add a service to the main module.
  .service('NotesService', NotesService);

// Create the service [function].
// Inject Dependencies
NotesService.$inject = ['$http'];
function NotesService($http) {
  // Create a variable to represent the NotesService, since the meaning of 'this' will change.
  var service = this;
  // Create a placeholder for all of our notes.
  service.notes = [];
  // Create a function to fetch data from the server.
  service.fetch = function(callback) {
    // Send an $http get request (promise) to the specified URL.
    $http.get('http://localhost:3000/notes')
      // Create a function to handle the $http response.
      .success(function(notesData) {
        service.notes = notesData;
        if (callback) {
          // If there is a callback action provided, call it.
          callback();
        }
      });
  };
  // Create a method to return the NotesService notes array.
  service.get = function() {
    return service.notes;
  }
}
