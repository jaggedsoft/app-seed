/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
'use strict';

// App services
angular.module('app.services', []);

// Util service
angular.module('app.services').factory('appServUtil', function() {
  // return for factory
  return {
    
    // Tidy time
    tidyTime: function tidyTime() {
      return new Date(new Date().toISOString().replace("Z", "+0" + (new Date().getTimezoneOffset()/60) + ":00")).toISOString().replace("T", " ").substr(0, 19);
    },

    // Tidy log
    tidyLog: function tidyLog(iStr, iOut) {
      var returnRes         = {"time": this.tidyTime(), "message": null};
          returnRes.message = (iStr && typeof console !== "undefined") ? iStr : null;

      return (iOut === undefined || iOut === true) ? console.log(returnRes) : returnRes;
    },

    // Goto url
    gotoUrl: function gotoUrl(iUrl, iParam) {

      // Check params
      if(iUrl === undefined) return false;

      // Init vars
      var iTarget         = 'self',
          iConfirm        = false,
          iConfirmMsg     = ''
      ;

      // Init params
      if(iParam !== undefined) {
        if(iParam.target !== undefined)     iTarget     = iParam.target;
        if(iParam.confirm !== undefined)    iConfirm    = iParam.confirm;
        if(iParam.confirmMsg !== undefined) iConfirmMsg = iParam.confirmMsg;
      }

      // Confirmation
      if(iConfirm === true) {
        if(!confirm(iConfirmMsg)) return false;
      }

      // goto url
      if(iTarget == '_blank') {
        window.open(iUrl, '_blank');
      }
      else {
        document.location.href = iUrl;
      }

      return true;
    }
  };
});

// Session service
angular.module('app.services').factory('appServSess', ['$injector', '$http', '$location', function($injector, $http, $location) {
  // Init vars
  var sessData      = null,
      sessErr       = null,
      sessInited    = false,
      hit1Trig      = false,
      initUrl       = '/sess/init?callback=JSON_CALLBACK',
      deinitUrl     = '/sess/deinit?callback=JSON_CALLBACK',
      taskerUrl     = '/sess/tasker?callback=JSON_CALLBACK'
      //$http       = $http || $injector.get('$http'),
      //$location   = $location || $injector.get('$location')
  ;

  // return for factory
  return {
    // Session initializer
    init: function(iCallback) {
      // Init vars
      var this_ = this;

      // Request for session initialization
      $http({method: 'JSONP', url: initUrl, cache: false, timeout: 10000}).
        success(function(data, status) {
          // Set data
          sessData = data;

          if(sessData) {
            // Check initialization
            if(sessData.inited !== undefined) {
              sessErr     = null;
              sessInited  = true;

              // Re-init session due first request
              if(hit1Trig === false && sessData.hit && sessData.hit === 1) {
                hit1Trig = true;
                return this_.init(iCallback);
              }
            }
          }

          // Callback or return
          if(iCallback && typeof iCallback === 'function') {
            return iCallback(sessErr, sessData);
          }
          else {
            return sessData;
          }
        }).
        error(function(data, status) {

          // Set error
          sessData    = null;
          sessErr     = 'Request error! (' + status + ')';
          sessInited  = false;

          // Callback or return
          if(iCallback && typeof iCallback === 'function') {
            return iCallback(sessErr, sessData);
          }
          else {
            return sessErr;
          }
      });
    },
    // Session de-initializer
    deinit: function(iCallback) {
      // Init vars
      var returnData,
          returnErr
      ;

      // Request for session initialization
      $http({method: 'JSONP', url: deinitUrl, cache: false, timeout: 10000}).
        success(function(data, status) {
          // Set data
          returnData = data;

          if(returnData) {
            // Check de-initialization
            if(returnData.deinited !== undefined) {
              returnErr   = null;
            }
            else {
              // Set error
              returnData  = null;
              returnErr   = 'Unexpected error! Session could not be de-initialized.';
            }
          }
          else {
            // Set error
            returnData    = null;
            returnErr     = 'Request error! (' + status + ')';
          }

          // Callback or return
          if(iCallback && typeof iCallback === 'function') {
            return iCallback(returnErr, returnData);
          }
          else {
            return returnData;
          }
        }).
        error(function(data, status) {
          // Set error
          returnData  = null;
          returnErr   = 'Request error! (' + status + ')';

          // Callback or return
          if(iCallback && typeof iCallback === 'function') {
            return iCallback(returnErr, returnData);
          }
          else {
            return returnData;
          }
      });
    },
    // Session tasker
    tasker: function(iCallback) {
      // Init vars
      var returnData,
          returnErr
      ;

      // Request for session initialization
      $http({method: 'JSONP', url: taskerUrl, cache: false, timeout: 10000}).
        success(function(data, status) {
          // Set data
          returnData = data;

          if(returnData) {
            // Check tasks
            if(returnData.task) {

              // Redirect
              if(returnData.task.type == 'redirect') {
                if(returnData.task.option && returnData.task.option.url) {
                  $location.path(returnData.task.option.url);
                }
              }
              else if(returnData.task.type == 'alert') {
                if(returnData.task.option && returnData.task.option.message) {
                  alert(returnData.task.option.message); //+++ change this to modal
                }
              }
            }
          }

          // Callback or return
          if(iCallback && typeof iCallback === 'function') {
            return iCallback(returnErr, returnData);
          }
          else {
            return returnData;
          }
        }).
        error(function(data, status) {
          // Set error
          returnData  = null;
          returnErr   = 'Request error! (' + status + ')';

          // Callback or return
          if(iCallback && typeof iCallback === 'function') {
            return iCallback(returnErr, returnData);
          }
          else {
            return returnData;
          }
      });
    },
    // Session data
    data: function() {
      // return data
      return sessData;
    },
    // Session error
    error: function() {
      // Check session initialization
      if(sessInited === false && sessErr === undefined) {
        sessErr = 'Session could not be initialized!';
      }

      // return error
      return sessErr;
    }
  };
}]);