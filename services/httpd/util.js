/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
'use strict';

// Init the module
exports = module.exports = function() {

  // Init vars
  var tidyTime,
      tidyLog,
      tidyClear
  ;

  // Returns tidy time stamp
  tidyTime = function tidyTime() {
    return new Date(new Date().toISOString().replace("Z", "+0" + (new Date().getTimezoneOffset()/60) + ":00")).toISOString().replace("T", " ").substr(0, 19);
  };

  // Returns or output tidy console log message
  tidyLog = function tidyLog(iStr, iOut) {
    var returnRes         = {"time": tidyTime(), "message": null};
        returnRes.message = (iStr && typeof console !== "undefined") ? iStr : null;

    return (iOut === undefined || iOut === true) ? console.log(returnRes) : returnRes;
  };

  // Clear console
  tidyClear = function tidyClear() {
    console.log('\u001B[2J\u001B[0;0f');
  };

 // Return
  return {
    tidyTime: tidyTime,
    tidyLog: tidyLog,
    tidyClear: tidyClear
  };
}();