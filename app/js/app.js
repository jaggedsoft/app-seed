/*
 * App
 * Copyright (c) 2013 Author (Url)
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
var app = angular.module('app', ['ngRoute']);

// Init global vars

// Init global funcs

// App routes
app.gRoutes = [
  {
    route: '/',
    templateUrl: 'template/home.html',
    controller: 'homeCtrl'
  }
];

// App resolves
app.gResolves = [
  {
    key: 'sessInit',
    factory: ['$http', '$q', '$location', function($http, $q, $location) {

      // Init vars
      var defer = $q.defer();

      // Init session
      // session code
      defer.resolve();

      return defer.promise;
    }]
  }
];

// App providers

// App config
app.config(['$routeProvider', function ($routeProvider) {

  // Init vars
  var tRoutes       = app.gRoutes,
      tRoutesCnt    = tRoutes.length,
      tResolves     = app.gResolves,
      tResolvesCnt  = tResolves.length
  ;
  
  // Init routes
  for(var i = 0; i < tRoutesCnt; i++) {

    // Init vars
    var tRoute = ('route' in tRoutes[i]) ? tRoutes[i].route : null;

    if(tRoute !== null) {

      // Route options
      var tRouteOpt = {};

      if('template' in tRoutes[i])    tRouteOpt.template    = tRoutes[i].template;
      if('templateUrl' in tRoutes[i]) tRouteOpt.templateUrl = tRoutes[i].templateUrl;
      if('controller' in tRoutes[i])  tRouteOpt.controller  = tRoutes[i].controller;
      if('resolve' in tRoutes[i])     tRouteOpt.resolve     = tRoutes[i].resolve;

      // Route resolves
      for(var j = 0; j < tResolvesCnt; j++) {
        if(tResolves[j].key && tResolves[j].factory) {
          if(tRouteOpt.resolve === undefined) tRouteOpt.resolve = {};
          tRouteOpt.resolve[tResolves[j].key] = tResolves[j].factory;
        }
      };

      // Init route
      $routeProvider.when(tRoute, {
        template: tRouteOpt.template,
        templateUrl: tRouteOpt.templateUrl,
        controller: tRouteOpt.controller,
        resolve: tRouteOpt.resolve
      });
    }
  };

  // Default route
  $routeProvider.otherwise({redirectTo: '/'});
}]);

// App controllers

// Home controller
app.controller('homeCtrl', ['$scope', function($scope) {
  $scope.message = "Home Controller";
}]);