// Use the existing notely module.
angular.module('notely')
  // Create a new service, inject the dependencies.
  .service('UsersService', ['$http', 'Flash', 'API_BASE', 'AuthToken', 'CurrentUser',
    ($http, Flash, API_BASE, AuthToken, CurrentUser) => {
    class UsersService {
      // Create a user.
      create(user) {
        // Get the promise to return.
        let promise = $http.post(`${API_BASE}users`, {
          user: user
        });
        // Do work with the promise in the service.
        promise.then((response) => {
          // Set the AuthToken
          AuthToken.set(response.data.auth_token);
          // Set the currentUser.
          CurrentUser.set(response.data.user);
        });
        // Return the promise.
        return promise;
      };
      // Get a user, login.
      login(user) {
        // Get the promise to return.
        let promise = $http.post(`${API_BASE}sessions`, {
          user: user
        });
        // Do work with the promise in the service.
        promise.then(
          // Success.
          (response) => {
            // Set the AuthToken
            AuthToken.set(response.data.auth_token);
            // Set the currentUser.
            CurrentUser.set(response.data.user);
          },
          // Error.
          (response) => {
            Flash.create('danger', response.data.message);
          }
        );
        // Return the promise.
        return promise;
      }
    }
    // Return an instance of the service class.
    return new UsersService();
  }]);
