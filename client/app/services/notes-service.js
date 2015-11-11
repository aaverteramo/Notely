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
  // Add a callback parameter: function to run on success.
  service.fetch = function(onSuccess, onError) {
    // Send an $http get request (promise) to the specified URL.
    // Return the request promise.
    return $http.get('http://localhost:3000/notes')
      // Create a function to handle the $http response.
      .then(
        // Success callback.
        function(response) {
          service.notes = response.data;
          if (onSuccess) {
            // If there is a callback action provided, call it and return the result.
            onSuccess(service.notes);
          }
        },
        // Failure callback
        function(response) {
          // TODO: Handle error.
          if (onError) {
            // If there is a callback action provided, call it.
            onError();
          }
        });
  };
  // Create a method to return the NotesService notes array, or a specified note in the array by Id.
  service.get = function(noteId) {
    if (noteId) {
      // Find a note in the array by id.
    }
    else {
      return service.notes;
    }
  };
  // Create a method to return a single note by searching by id.
  service.findById = function(noteId) {
    // Find the note in service.notes with a matching _id.
    for (var i = 0; i < service.notes.length; i++) {
      if (service.notes[i]._id === noteId) {
        // Use angular to return a copy of the object.
        return angular.copy(service.notes[i]);
        // Use JSON to return a copy of the object.
        //return JSON.parse(JSON.stringify(service.notes[i]));
      }
    }
    return {};
  };
  // Create a method to save the note to the collection.
  service.create = function(note) {
    // Get the promise to return.
    var promise = $http.post('http://localhost:3000/notes', {
      note: note
    });
    // Do work with the promise in the service.
    promise.then(function(response) {
      // Add the saved note to the top of the array.
      service.notes.unshift(response.data.note);
    });
    // Return the promise.
    return promise;
  };
  // Create a method to update an existing note.
  service.update = function(note) {
    // Get the promise to return.
    var promise = $http.put('http://localhost:3000/notes/' + note._id, {
      // Only specify fields that can be updated from the client side.
      note: {
        title: note.title,
        body_html: note.body_html
      }
    });
    // Do work with the promise in the service.
    promise.then(function(response) {
      // Replace the saved note in the array.
      service.replaceNote(response.data.note);
      console.log('Note has been updated!');
    });
    // Return the promise.
    return promise;
  };
  // Replace a note in the array.
  service.replaceNote = function(note) {
    for (var i = 0; i < service.notes.length; i++) {
      if (service.notes[i]._id === note._id) {
        service.notes[i] = note;
      }
    }
  };
}
