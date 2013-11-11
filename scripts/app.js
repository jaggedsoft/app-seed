#!/usr/bin/env node

// Init reqs
var mFS         = require('fs'),    // fs module
    mHapi       = require('hapi'),  // hapi module
    mPath       = require('path')   // path module
;

// Init global vars
var gPathCur,     // current path
    gPathScrFile, // script file path
    gPathScrDir,  // script path
    gConfig,      // config
    gConfigError, // config error
    gArgs,        // arguments
    gArgsCnt,     // arguments count
    gEnvNode,     // environment
    gServer,      // http server
    gRoutes       // routes
;

gPathCur        = mFS.realpathSync('.') + mPath.sep;
gPathScrFile    = __filename;
gPathScrDir     = __dirname;
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
      gConfig       = JSON.parse(mFS.readFileSync(gConfig.configFile)); //+++ Check exists members of gConfig
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
  // Check config paramaters such as server port etc...
}

if(gConfigError !== null) {
  console.log('Configuraton error! (' + gConfigError + ')');

  process.exit(0);
}

// Init global funcs

// Tidy time
function tidyTime() {
  return new Date(new Date().toISOString().replace("Z", "+0" + (new Date().getTimezoneOffset()/60) + ":00")).toISOString().replace("T", " ").substr(0, 19);
}

// Console log
function tidyLog(iStr, iOut) {
  var returnRes         = {"time": tidyTime(), "message": null};
      returnRes.message = (iStr && typeof console !== "undefined") ? iStr : null;

  return (iOut === undefined || iOut === true) ? console.log(returnRes) : returnRes;
}

// Global config
gConfig = {
  hapi: {
    server: {
      port: 12080
    },
    yar: {
      options: {
        name: 'appsess',
        maxCookieSize: 0,
        cookieOptions: {
          password: 'cOOkIEPaSSWoRD',
          isSecure: false //+++ Take from env or config file
        }
      }
    }
  }
};

// Create server
gServer = new mHapi.createServer('localhost', gConfig.hapi.server.port);

// Init yar plugin
gServer.pack.allow({ext: true}).require('yar', gConfig.hapi.yar.options, function(err) {
  if(err) {
    tidyLog('Yar plugin could not be initialized! (' + err + ')');
    throw err;
  }
});

// Init server routes

// Default route for static files
gRoutes = [
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        listing: false,
        index: true,
        path: function(request) {
          //tidyLog('request.params:' + JSON.stringify(request.params));  // for debug
          //tidyLog('request.path:' + JSON.stringify(request.path));      // for debug

          return gPathScrDir + '/../app';
        }
      }
    }
  }
];

// Start server
gServer.route(gRoutes);

gServer.start(function() {
  tidyLog('Server is listening on port ' + gConfig.hapi.server.port);
});