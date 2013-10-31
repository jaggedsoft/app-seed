// Init reqs
var mFS         = require('fs'),  // fs module
    mPath       = require('path') // path module
;

// Init global vars
var gPathCur,     // current path
    gConfig,      // config
    gConfigError, // config error
    gArgs,        // arguments
    gArgsCnt,     // arguments count
    gEnvNode      // environment
;

gPathCur        = mFS.realpathSync('.') + mPath.sep;
gConfig         = {"configFile": null};
gConfigError    = null;
gArgs           = process.argv;
gArgsCnt        = gArgs.length;
gEnvNode        = (process.env.NODE_ENV !== undefined) ? process.env.NODE_ENV : 'unknown';

// Init Argv
if(gArgsCnt > 2) {
  for(var i = 2; i < gArgsCnt; i++) {
    switch(gArgs[i]) {
      case "-c":
      case "--configFile":
        gConfig.configFile  = (gArgs[++i] + '').trim();
        break;
      default:
        console.log("Invalid argument! (" + gArgs[i] + ")");
        process.exit(0);
        break;
    }
  }
}

// Check config
if(gConfig.configFile !== null) {
  if(mFS.existsSync(gConfig.configFile)) {
    try {
      gConfig       = JSON.parse(mFS.readFileSync(gConfig.configFile, encoding='utf8'));
    }
    catch(e) {
      gConfigError  = 'Invalid configuration file. (' + e + ')';
    }
  }
  else {
    gConfigError    = 'Configuration file could not be read.';
  }
}

if(gConfigError === null) {
  // Check config paramaters
}

if(gConfigError !== null) {
  console.log('Configuraton error! (' + gConfigError + ')');

  process.exit(0);
}

// Init global funcs

// Tidy time
function timeTidy() {
  return new Date(new Date().toISOString().replace("Z", "+0" + (new Date().getTimezoneOffset()/60) + ":00")).toISOString().replace("T", " ").substr(0, 19);
}

// Console log
function logConsole(iStr) {
  var returnRes         = {"source":"app.js", "time": timeTidy(), "message": null};
      returnRes.message = (iStr && typeof console != "undefined") ? iStr : null;

  return console.log(returnRes);
}

// Code begin

logConsole('done!');