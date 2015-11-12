angular.module('notely')
  // Always declare directives using camelCase. The directive in mark up will be 'dasherized'.
  .directive('appHead', ['CurrentUser', (CurrentUser) => {

    // Declare the controller as an ES6 class.
    class AppHeadController {
      constructor() {
        this.user = CurrentUser.get();
      };
      buttonText() {
        return this.user._id ? 'Logout' : 'Login';
      };
      loginState() {
        if (this.user._id) {
          // Logout.
          CurrentUser.clear();
        }
        else {
          // Redirect to login screen.
        }
      };
    }

    // Definte the behavior of the directive.
    return {
      // Give each instance of the directive its own scope.
      scope: {},
      controller: AppHeadController,
      // Inside the directive's view, we can refer to the controller as 'ctrl'.
      controllerAs: 'ctrl',
      // Isolates the scope defined here.
      bindToController: true,
      templateUrl: '/components/user-links.html'
    };
  }]);
