// Init reqs
'use strict';

// App routes

angular.module('app.routes', []);

// Routes
angular.module('app.routes').value('routes', [
  {
    route: '/',
    templateUrl: 'template/home.html',
    controller: 'homeCtrl'
  },
  {
    route: '/login',
    templateUrl: 'template/login.html',
    controller: 'loginCtrl'
  }
]);