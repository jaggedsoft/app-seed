// Init reqs
'use strict';

// App providers

// Main provider
angular.module('app.providers', []);

// Util provider
angular.module('app.providers').factory('util', function() {
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