#!/usr/bin/env node

// Init reqs
var mFS             = require('fs'),            // fs module
    mPath           = require('path'),          // path module
    mHapi           = require('hapi'),          // hapi module
    mGoogleAPIs     = require('googleapis')     // googleapis module
;

// Init global vars
var gPathSep        = mPath.sep,                // path separator
    gPathCur        = mFS.realpathSync('.'),    // current path
    gPathScrFile    = __filename,               // script file path
    gPathScrDir     = __dirname,                // script path
    gConfig         = {"configFile": null},     // config
    gConfigError    = null,                     // config error
    gArgs           = process.argv,             // arguments
    gArgsCnt        = gArgs.length,             // arguments count
    gServer         = null,                     // http server
    gRoutes         = [],                       // routes
    gRouteOpts      = [],                       // route options
    gOAuth2Client   = mGoogleAPIs.OAuth2Client, // oauth2 client
    gEnvNode        = (process.env.NODE_ENV !== undefined) ? process.env.NODE_ENV : null // environment
;

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

// Console clear
function tidyClear() {
  console.log('\u001B[2J\u001B[0;0f');
}

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
          isSecure: false
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

// Route options
gRouteOpts = [
  {
    route: '/home',
    match: '/template/home.html',
    auth: {
      roles: ['user'],
      noIsLogin: false
    }
  },
  {
    route: '/login',
    match: '/template/login.html',
    auth: {
      roles: [],
      noIsLogin: true
    }
  }
];

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
          return gPathScrDir + '/../../app';
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