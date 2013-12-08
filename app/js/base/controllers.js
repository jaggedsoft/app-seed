/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
'use strict';

// App controllers
angular.module('app.controllers', []);

// Home controller
angular.module('app.controllers').controller('appHomeCtrl', ['$scope', 'appServSess', function($scope, appServSess) {
  // Init vars
  var sessData = (!appServSess.error()) ? appServSess.data() : null;
}]);

// Login controller
angular.module('app.controllers').controller('appLoginCtrl', ['$scope', 'appServSess', function($scope, appServSess) {
  // Session de-initialization
  var sessData = (!appServSess.error()) ? appServSess.data() : null;

  $scope.loginUrl = (sessData && sessData.user && sessData.user.loginUrl) ? sessData.user.loginUrl : '#/error/login/url/unexpected';
}]);

// Logout controller
angular.module('app.controllers').controller('appLogoutCtrl', ['$scope', 'appServSess', function($scope, appServSess) {
  appServSess.deinit(function(err, data) {
    if(!err) {
      $scope.message = data.message;
    }
    else {
      $scope.message = err;
    }
  });
}]);

// Account controller
angular.module('app.controllers').controller('appAccountCtrl', ['$scope', 'appServSess', function($scope, appServSess) {
  // Init vars
  var sessData = (!appServSess.error()) ? appServSess.data() : null;

  $scope.tidySData = JSON.stringify(sessData, null, 2);
}]);

// Nav controller
angular.module('app.controllers').controller('appNavCtrl', ['$scope', 'appServSess', function($scope, appServSess) {
  // Init vars
  var sessData = (!appServSess.error()) ? appServSess.data() : null;
  var isLogin  = (sessData && sessData.user && sessData.user.isLogin === true) ? true : false;

  if(isLogin === true) {
    $scope.user   = '(' + sessData.user.email + ')';
    $scope.llUrl  = '#/logout';
    $scope.llText = 'Sign out';
  }
  else {
    $scope.user   = '';
    $scope.llUrl  = '#/login';
    $scope.llText = 'Sign in';
  }
}]);