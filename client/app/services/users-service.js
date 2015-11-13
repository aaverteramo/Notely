// Use the existing notely module.
angular.module('notely')
  // Create a new service, inject the dependencies.
  .service('UsersService', ['$http', 'API_BASE', 'AuthToken', 'CurrentUser', ($http, API_BASE, AuthToken, CurrentUser) => {
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
          //console.log(response.data);
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
        promise.then((response) => {
          console.log('it worked!');
          // Set the AuthToken
          AuthToken.set(response.data.auth_token);
          // Set the currentUser.
          CurrentUser.set(response.data.user);
          //console.log(response.data);
        });
        // Return the promise.
        return promise;
      }
    }
    // Return an instance of the service class.
    return new UsersService();
  }]);
