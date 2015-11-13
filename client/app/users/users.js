(function() {
  angular.module('notely')
    .config(usersConfig);

  usersConfig.$inject = ['$stateProvider'];
  function usersConfig($stateProvider) {
    $stateProvider
      .state('sign-up', {
        url: '/sign-up',
        // Use a directive we have defined ourselves.
        template: '<sign-up></sign-up>'
      })
      .state('sign-in', {
        url: '/sign-in',
        template: '<sign-in></sign-in>'
      })
      .state('log-out', {
        url: '/log-out',
        controller: ['$state', 'AuthToken', 'CurrentUser',
          function($state, AuthToken, CurrentUser) {
            AuthToken.clear();
            CurrentUser.clear();
            $state.go('sign-in');
          }]
      });
  };
})();
