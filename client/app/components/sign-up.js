angular.module('notely')
  // Always declare directives using camelCase. The directive in mark up will be 'dasherized'.
  .directive('signUp', () => {

    // Declare the controller as an ES6 class.
    class SignUpController {
      constructor() {
        this.user = {};
      }
      submit() {
        alert('click!' + JSON.stringify(this.user));
        console.log(this.user);
      }
    }

    // Definte the behavior of the directive.
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
  });
