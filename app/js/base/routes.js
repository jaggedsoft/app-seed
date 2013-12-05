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
    factory: ['$http', '$q', '$location', 'appSess', function($http, $q, $location, appSess) {
      // Init vars
      var defer = $q.defer();
     
      // Init session
      appSess.init(function(err, data) {
        if(!err) {
          appSess.tasker(function(err, data) {
            if(!err) {
              defer.resolve();
            }
            else {
              $location.path('error/sess/tasker/unexpected');
              defer.reject();
            }
          });
        }
        else {
          $location.path('error/sess/init/unexpected');
          defer.reject();
        }
      });

      defer.resolve();

      return defer.promise;
    }]
  }
]);