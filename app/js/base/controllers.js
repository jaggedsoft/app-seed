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
angular.module('app.controllers').controller('appHomeCtrl', ['$scope', function($scope) {
}]);

// Login controller
angular.module('app.controllers').controller('appLoginCtrl', ['$scope', 'appServSess', function($scope, appServSess) {
  // Session de-initialization
  var sessData = (!appServSess.error()) ? appServSess.data() : null;

  $scope.loginUrl = (sessData && sessData.user && sessData.user.loginUrl) ? sessData.user.loginUrl : '#/error/login/url/unexpected';
}]);

// Logout controller
angular.module('app.controllers').controller('appLogoutCtrl', ['$scope', 'appServSess', function($scope, appServSess) {
  // Init vars
  var sessData = (!appServSess.error()) ? appServSess.data() : null;

  $scope.logoutMessage = 'You have successfully signed out.';
}]);

// Account controller
angular.module('app.controllers').controller('appAccountCtrl', ['$scope', 'appServSess', 'appServUtil', function($scope, appServSess, appServUtil) {
  // Init vars
  var sessData = (!appServSess.error()) ? appServSess.data() : null;
  var isLogin  = (sessData && sessData.user && sessData.user.isLogin === true) ? true : false;

  if(isLogin === true) {
    $scope.accSessData = JSON.stringify(sessData, null, 2);
  }
  else {
    $scope.accSessData = 'You are not signed in.';
    appServUtil.gotoUrl('#/login');
  }
}]);

// Nav controller
angular.module('app.controllers').controller('appNavCtrl', ['$scope', 'appServSess', function($scope, appServSess) {
  // Init vars
  var sessData = (!appServSess.error()) ? appServSess.data() : null;
  var isLogin  = (sessData && sessData.user && sessData.user.isLogin === true) ? true : false;

  if(isLogin === true) {
    $scope.navSSNote  = '(' + sessData.user.email + ')';
    $scope.navSSUrl   = '#/logout';
    $scope.navSSText  = 'Sign out';
  }
  else {
    $scope.navSSNote  = '';
    $scope.navSSUrl   = '#/login';
    $scope.navSSText  = 'Sign in';
  }
}]);