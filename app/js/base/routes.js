/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

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
  },
  {
    route: '/account',
    templateUrl: 'template/account.html',
    controller: 'appAccountCtrl'
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

      return defer.promise;
    }]
  }
]);