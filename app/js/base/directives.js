/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
'use strict';

// App controllers
angular.module('app.directives', []);

// Navigation directive
angular.module('app.directives').directive('appDirvNav', function() {
  //return
  return {
    templateUrl: "template/nav.html"
  };
});