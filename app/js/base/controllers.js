// Init reqs
'use strict';

// App controllers

angular.module('app.controllers', []);

// Home controller
angular.module('app.controllers').controller('homeCtrl', ['$scope', function($scope) {
  $scope.message = "Home Controller";
}]);

// Login controller
angular.module('app.controllers').controller('loginCtrl', ['$scope', function($scope) {
  $scope.signInLink = "Login Controller";
}]);