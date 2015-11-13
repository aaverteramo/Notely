angular.module('notely')
  // Always declare directives using camelCase. The directive in mark up will be 'dasherized'.
  .directive('userLinks', () => {
    // Declare the controller as an ES6 class.
    class UserLinksController {
      constructor(AuthToken, CurrentUser) {
        this.AuthToken = AuthToken;
        this.CurrentUser = CurrentUser;
      };
      user() {
        return this.CurrentUser.get();
      };
      signedIn() {
        return !!(this.user()._id);
      };
    }
    UserLinksController.$inject = ['AuthToken', 'CurrentUser'];

    // Definte the behavior of the directive.
    return {
      // Give each instance of the directive its own scope.
      scope: {},
      controller: UserLinksController,
      // Inside the directive's view, we can refer to the controller as 'ctrl'.
      controllerAs: 'ctrl',
      // Isolates the scope defined here.
      bindToController: true,
      //templateUrl: '/components/user-links.html'
      template: `
        <div class="user-links">
          <div ng-show="ctrl.signedIn()">
            Signed in as {{ctrl.user().username}}
            |
            <a href="#" ui-sref="log-out">Logout</a>
          </div>
          <div ng-show="!ctrl.signedIn()">
            <a href="#" ui-sref="sign-in">Login</a>
            |
            <a href="#" ui-sref="sign-up">Create Account</a>
          </div>
        </div>
      `
    };
  });
