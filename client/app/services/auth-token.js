angular.module('notely')
  // Create a new service for auth_token.
  // Pass in the current $window
  .service('AuthToken', ['$window', ($window) => {

    class AuthToken {
      constructor() {
        // Get the authToken from local storage, if it exists.
        this.authToken = $window.localStorage.getItem('authToken');
      }
      // Set the authToken attribute and the local storage item.
      set(token) {
        this.authToken = token;
        $window.localStorage.setItem('authToken', this.authToken);
      }
      // Get the authToken attribute.
      get() {
        return this.authToken || {};
      }
      // Clear the authToken attribute and the local storage item.
      clear() {
        this.authToken = undefined;
        $window.localStorage.removeItem('authToken');
      }
    }
    // Return an instance of the service.
    return new AuthToken();
  }]);
