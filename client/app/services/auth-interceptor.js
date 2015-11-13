angular.module('notely')
  .factory('AuthInterceptor', ['AuthToken', 'API_BASE',
    function(AuthToken, API_BASE) {
      return {
        // Create a function for this as a request interceptor.
        request: function(config) {
          var token = AuthToken.get();
          console.log(token);
          console.log(config.url);
          if (token && config.url.indexOf(API_BASE) > -1) {
            config.headers['Authorization'] = token;
          }
          return config;
        }
      };
    }]);

angular.module('notely')
  // Instruct config to use AuthInterceptor as an interceptor.
  .config(['$httpProvider', function($httpProvider) {
    // Add the AuthInterceptor to the array of interceptors.
    return $httpProvider.interceptors.push('AuthInterceptor');
  }]);
