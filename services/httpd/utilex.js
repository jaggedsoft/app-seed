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
  var mFS           = require('fs'),    // fs module
      mPath         = require('path'),  // path module

      tidyTime,     // tidy time stamp
      tidyLog,      // tidy log message
      tidyClear,    // clear console
      pathSep,      // system path separator
      pathCur,       // current path
      envMode       // environment mode
  ;

  // Returns tidy time stamp
  tidyTime = function tidyTime() {
    return new Date(new Date().toISOString().replace("Z", "+0" + (new Date().getTimezoneOffset()/60) + ":00")).toISOString().replace("T", " ").substr(0, 19);
  };

  // Returns or output tidy log message
  tidyLog = function tidyLog(iStr, iOut) {
    var returnRes         = {"time": tidyTime(), "message": null};
        returnRes.message = (iStr && typeof console !== "undefined") ? iStr : null;

    return (iOut === undefined || iOut === true) ? console.log(returnRes) : returnRes;
  };

  // Clear console
  tidyClear = function tidyClear() {
    console.log('\u001B[2J\u001B[0;0f');
  };

  // Returns system path separator
  pathSep = function pathSep() {
    return mPath.sep;
  }();

  // Returns current path
  pathCur = function pathCur() {
    return mFS.realpathSync('.');
  }();

  // Returns current path
  envMode = function envMode() {
    return (process.env.NODE_ENV !== undefined) ? process.env.NODE_ENV : null;
  }();

  // Return
  return {
    tidyTime: tidyTime,
    tidyLog: tidyLog,
    tidyClear: tidyClear,
    pathSep: pathSep,
    pathCur: pathCur,
    envMode: envMode
  };
}();