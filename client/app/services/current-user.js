angular.module('notely')
  // Create a new service for auth_token.
  // Pass in the current $window
  .service('CurrentUser', ['$window', ($window) => {

    class CurrentUser {
      constructor() {
        // Get the authToken from local storage, if it exists.
        this.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
      }
      // Set the authToken attribute and the local storage item.
      set(user) {
        this.currentUser = user;
        $window.localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }
      // Get the authToken attribute.
      get() {
        return this.currentUser || {};
      }
      // Clear the authToken attribute and the local storage item.
      clear() {
        this.currentUser = undefined;
        $window.localStorage.removeItem('currentUser');
      }
      isSignedIn() {
        return !!(this.get()._id);
      }
    }
    // Return an instance of the service.
    return new CurrentUser();
  }]);
