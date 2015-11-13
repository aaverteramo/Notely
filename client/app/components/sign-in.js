angular.module('notely')
  // Always declare directives using camelCase. The directive in mark up will be 'dasherized'.
  .directive('signIn', ['$state', 'UsersService', ($state, UsersService) => {

    // Declare the controller as an ES6 class.
    class SignInController {
      constructor() {
        this.user = {};
      }
      login() {
        // Get the user, login.
        UsersService.login(this.user)
          .then(
            function(response) {
              // success
              console.log('success');
              // Redirect to the notes page.
              $state.go('notes');
            },
            function(response) {
              // failure
              console.log('failure :(');
            });
      }
    }

    // Definte the behavior of the directive.
    return {
      // Give each instance of the directive its own scope.
      scope: {},
      controller: SignInController,
      // Inside the directive's view, we can refer to the controller as 'ctrl'.
      controllerAs: 'ctrl',
      // Isolates the scope defined here.
      bindToController: true,
      templateUrl: '/components/sign-in.html'
    };
  }]);
