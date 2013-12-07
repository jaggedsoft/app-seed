/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
'use strict';

var mFS   = require('fs'),  // fs module
    mPath = require('path') // path module
;

// Init the module
exports = module.exports = function() {

  // Init vars
  var tidyTime,   // tidy time stamp - function
      tidyLog,    // tidy log message - function
      tidyClear,  // clear console - function
      tidyArgs,   // tidy arguments - function
      pathSep,    // system path separator - function
      pathCur,    // current path - function
      envMode,    // environment mode - function

      args        = process.argv, // arguments
      argsCnt     = args.length,  // arguments count
      argsF       = {}
  ;

  // Init arguments
  if(argsCnt > 2) {
    for(var i = 2; i < argsCnt; i++) {
      switch(args[i]) {
        case "-c":
        case "--configFile":
          argsF.c           = (args[++i] + '').trim();
          argsF.configFile  = argsF.c;
          break;
        default:
          console.log("Invalid argument! (" + args[i] + ")");
          break;
      }
    }
  }

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

  // Returns tidy arguments
  tidyArgs = function tidyArgs() {
    return argsF;
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
    tidyArgs: tidyArgs,
    pathSep: pathSep,
    pathCur: pathCur,
    envMode: envMode
  };
}();