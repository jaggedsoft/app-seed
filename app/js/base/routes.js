// Init reqs
'use strict';

// App routes
angular.module('app.routes', []);

// Routes
angular.module('app.routes').constant('appRoutes', [
  {
    route: '/',
    templateUrl: 'template/home.html',
    controller: 'appHomeCtrl'
  },
  {
    route: '/login',
    templateUrl: 'template/login.html',
    controller: 'appLoginCtrl'
  }
]);

// Routes resolves
angular.module('app.routes').constant('appRoutesResolves', [
  {
    key: 'sessInit',
    factory: ['$http', '$q', '$location', function($http, $q, $location) {

      //console.log('location.path:' + $location.path()); // for debug

      // Init vars
      var defer = $q.defer();

      // Init session
      
      /* session code */

      defer.resolve();

      return defer.promise;
    }]
  }
]);