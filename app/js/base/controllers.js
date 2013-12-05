// Init reqs
'use strict';

// App controllers
angular.module('app.controllers', []);

// Home controller
angular.module('app.controllers').controller('appHomeCtrl', ['$scope', 'appSess', function($scope, appSess) {
  // Init vars
  var sessData      = (!appSess.error()) ? appSess.data() : null;

  $scope.message    = "Home Controller";
}]);

// Login controller
angular.module('app.controllers').controller('appLoginCtrl', ['$scope', 'appSess', function($scope, appSess) {
  // Init vars
  var sessData    = (!appSess.error()) ? appSess.data() : null;

  $scope.message  = "Login Controller";
}]);