// Use the existing notely module.
angular.module('notely')
  // Create a new service, inject the dependencies.
  .service('UsersService', ['$http', 'API_BASE', ($http, API_BASE) => {
    class UsersService {
      // Create a user.
      create(user) {
        // Get the promise to return.
        let promise = $http.post(`${API_BASE}users`, {
          user: user
        });
        // Do work with the promise in the service.
        promise.then((response) => {
          console.log(response.data.user);
        });
        // Return the promise.
        return promise;
      };
    }
    // Return an instance of the service class.
    return new UsersService();
  }]);
