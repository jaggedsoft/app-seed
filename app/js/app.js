/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
'use strict';

// Init App
angular.module('app', [
  'ngRoute',
  'app.routes',
  'app.services',
  'app.controllers'
]).config(['$routeProvider', 'appRoutes', 'appRoutesResolves', function($routeProvider, appRoutes, appRoutesResolves) {

  // Init vars
  var tRoutes       = appRoutes,
      tRoutesCnt    = tRoutes.length,
      tResolves     = appRoutesResolves,
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
      }

      // Init route
      $routeProvider.when(tRoute, {
        template: tRouteOpt.template,
        templateUrl: tRouteOpt.templateUrl,
        controller: tRouteOpt.controller,
        resolve: tRouteOpt.resolve
      });
    }
  }

  // Default route
  //$routeProvider.otherwise({redirectTo: '/'});
}]);