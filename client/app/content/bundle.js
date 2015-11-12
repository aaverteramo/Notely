// IFFE for our notely application.
'use strict';

(function () {
  // Inject dependancy for ui.router into the notely application / module.
  // ** Array of other modules to include.
  var app = angular.module('notely', ['ui.router', 'notely.notes']);

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
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

angular.module('notely')
// Always declare directives using camelCase. The directive in mark up will be 'dasherized'.
.directive('signUp', ['UsersService', function (UsersService) {

  // Declare the controller as an ES6 class.

  var SignUpController = (function () {
    function SignUpController() {
      _classCallCheck(this, SignUpController);

      this.user = {};
    }

    // Definte the behavior of the directive.

    _createClass(SignUpController, [{
      key: 'submit',
      value: function submit() {
        // Create the user.
        UsersService.create(this.user);
      }
    }]);

    return SignUpController;
  })();

  return {
    // Give each instance of the directive its own scope.
    scope: {},
    controller: SignUpController,
    // Inside the directive's view, we can refer to the controller as 'ctrl'.
    controllerAs: 'ctrl',
    // Isolates the scope defined here.
    bindToController: true,
    templateUrl: '/components/sign-up.html'
  };
}]);
// Create IIFE for the Notes page.
'use strict';

(function () {
  // Add a notes module to the main notely module.
  angular.module('notely.notes', ['ui.router', 'textAngular'])
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
        notesLoaded: ['NotesService', function (NotesService) {
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
    });
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
    $scope.save = function () {
      // Decide whether to call create or update.
      if ($scope.note._id) {
        // Update an existing note.
        console.log('Need to update the note.');
        NotesService.update($scope.note).then(function (response) {
          // Reset the $scope.note so we have the scrubbed body_html.
          $scope.note = angular.copy(response.data.note);
        });
      } else {
        if ($scope.note.title && $scope.note.body_html) {
          // Create the note.
          NotesService.create($scope.note).then(function (response) {
            $state.go('notes.form', { noteId: response.data.note._id });
          });
          console.log('saved note!');
        } else {
          console.log('cannot save note!');
        }
      }
    };

    $scope['delete'] = function () {
      // Delete the note.
      NotesService['delete']($scope.note).then(function (response) {
        $state.go('notes.form', { noteId: undefined });
      });
    };

    $scope.buttonText = function () {
      return $scope.note._id ? 'Save Changes' : 'Save';
    };
  }

  // Invoke the function.
})();
// Create a service.js to communicate with the server.
// This can be used by multiple controllers to CRUD data.

// Use the existing main module.
'use strict';

angular.module('notely')
// Add a service to the main module.
.service('NotesService', NotesService);

// Create the service [function].
// Inject Dependencies
NotesService.$inject = ['$http', 'API_BASE'];
function NotesService($http, API_BASE) {
  // Create a variable to represent the NotesService, since the meaning of 'this' will change.
  var service = this;
  // Create a placeholder for all of our notes.
  service.notes = [];
  // Create a function to fetch data from the server.
  // Add a callback parameter: function to run on success.
  service.fetch = function (onSuccess, onError) {
    // Send an $http get request (promise) to the specified URL.
    // Return the request promise.
    return $http.get(API_BASE + 'notes')
    // Create a function to handle the $http response.
    .then(
    // Success callback.
    function (response) {
      service.notes = response.data;
      if (onSuccess) {
        // If there is a callback action provided, call it and return the result.
        onSuccess(service.notes);
      }
    },
    // Failure callback
    function (response) {
      // TODO: Handle error.
      if (onError) {
        // If there is a callback action provided, call it.
        onError();
      }
    });
  };
  // Create a method to return the NotesService notes array.
  service.get = function () {
    return service.notes;
  };
  // Create a method to return a single note by searching by id.
  service.findById = function (noteId) {
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
  service.create = function (note) {
    // Get the promise to return.
    var promise = $http.post(API_BASE + 'notes', {
      note: note
    });
    // Do work with the promise in the service.
    promise.then(function (response) {
      // Add the saved note to the top of the array.
      service.notes.unshift(response.data.note);
      console.log('Note has been created!');
    });
    // Return the promise.
    return promise;
  };
  // Create a method to update an existing note.
  service.update = function (note) {
    // Get the promise to return.
    var promise = $http.put(API_BASE + 'notes/' + note._id, {
      // Only specify fields that can be updated from the client side.
      note: {
        title: note.title,
        body_html: note.body_html
      }
    });
    // Do work with the promise in the service.
    promise.then(function (response) {
      // Replace the saved note in the array.
      service.replaceNote(response.data.note);
      console.log('Note has been updated!');
    });
    // Return the promise.
    return promise;
  };
  // Create a method to delete an existing note.
  service['delete'] = function (note) {
    // Delete the note.
    var promise = $http['delete'](API_BASE + 'notes/' + note._id);
    // Do work with the promise in the service.
    promise.then(function (response) {
      // Remove the deleted note from the array.
      service.removeNote(note);
      console.log('Note has been deleted!');
    });
    // Return the promise.
    return promise;
  };
  // Replace a note in the array.
  service.replaceNote = function (note) {
    for (var i = 0; i < service.notes.length; i++) {
      if (service.notes[i]._id === note._id) {
        service.notes[i] = note;
      }
    }
  };
  // Remove a note from the array.
  service.removeNote = function (note) {
    for (var i = 0; i < service.notes.length; i++) {
      if (service.notes[i]._id === note._id) {
        // Remove the array item at the provided index.
        service.notes.splice(i, 1);
      }
    }
  };
}
// Use the existing notely module.
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

angular.module('notely')
// Create a new service, inject the dependencies.
.service('UsersService', ['$http', 'API_BASE', function ($http, API_BASE) {
  var UsersService = (function () {
    function UsersService() {
      _classCallCheck(this, UsersService);
    }

    // Return an instance of the service class.

    _createClass(UsersService, [{
      key: 'create',

      // Create a user.
      value: function create(user) {
        // Get the promise to return.
        var promise = $http.post(API_BASE + 'users', {
          user: user
        });
        // Do work with the promise in the service.
        promise.then(function (response) {
          console.log(response.data.user);
        });
        // Return the promise.
        return promise;
      }
    }]);

    return UsersService;
  })();

  return new UsersService();
}]);
'use strict';

(function () {
  angular.module('notely').config(usersConfig);

  usersConfig.$inject = ['$stateProvider'];
  function usersConfig($stateProvider) {
    $stateProvider.state('sign-up', {
      url: '/sign-up',
      // Use a directive we have defined ourselves.
      template: '<sign-up></sign-up>'
    });
  };
})();
//# sourceMappingURL=bundle.js.map
