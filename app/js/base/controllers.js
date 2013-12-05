// Init reqs
'use strict';

// App controllers
angular.module('app.controllers', []);

// Home controller
angular.module('app.controllers').controller('appHomeCtrl', ['$scope', 'appSess', function($scope, appSess) {
  // Init vars
  var sessData      = (!appSess.error()) ? appSess.data() : null;
}]);

// Login controller
angular.module('app.controllers').controller('appLoginCtrl', ['$scope', 'appSess', 'appUtil', function($scope, appSess, appUtil) {
  // Init vars
  var sessData      = (!appSess.error()) ? appSess.data() : null;

  $scope.loginUrl   = (sessData && sessData.user && sessData.user.loginUrl) ? sessData.user.loginUrl : '#/error/login/url/unexpected';
}]);

// Account controller
angular.module('app.controllers').controller('appAccountCtrl', ['$scope', 'appSess', 'appUtil', function($scope, appSess, appUtil) {
  // Init vars
  var sessData      = (!appSess.error()) ? appSess.data() : null;

  $scope.tidySData  = JSON.stringify(sessData, null, 2);
}]);