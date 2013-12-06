/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
'use strict';

var mFS             = require('fs'),            // fs module
    mPath           = require('path'),          // path module
    mHapi           = require('hapi'),          // hapi module

    mUtilex         = require('./utilex'),      // utilex module
    mRoute          = require('./route'),       // route module
    mOAuth2         = require('./oauth2'),      // oauth2 module
    mEvent          = require('./event')        // event module
;

// Init vars
var gConfig         = {},                       // config
    gConfigError    = null,                     // config error
    gConfigFile     = null,                     // config file
    gArgs           = process.argv,             // arguments
    gArgsCnt        = gArgs.length,             // arguments count
    gServer         = null,                     // http server
    gRoute          = null,                     // route helper
    gEvent          = null                      // event helper
;

// Init Argv
if(gArgsCnt > 2) {
  for(var i = 2; i < gArgsCnt; i++) {
    switch(gArgs[i]) {
      case "-c":
      case "--configFile":
        gConfigFile  = (gArgs[++i] + '').trim();
        break;
      default:
        console.log("Invalid argument! (" + gArgs[i] + ")");
        process.exit(0);
        break;
    }
  }
}

// Check config
if(!gConfigFile) {
  gConfigFile       = __dirname + mUtilex.pathSep + 'def-config.json';
}

if(gConfigFile) {
  if(mFS.existsSync(gConfigFile)) {
    try {
      gConfig       = JSON.parse(mFS.readFileSync(gConfigFile));
    }
    catch(e) {
      gConfigError  = 'Invalid configuration file. (' + gConfigFile + ') (' + e + ')';
    }
  }
  else {
    gConfigError    = 'Configuration file could not be read. (' + gConfigFile + ')';
  }
}

// Check config
if(gConfigError === null) {
  if(!gConfig.auth || !gConfig.auth.oauth2Client) {
    // oauth2
    gConfigError = 'Invalid oauth2 client configuration (' + JSON.stringify(gConfig.auth) + ')';
  }
  else if(!gConfig.hapi || !gConfig.hapi.server || !gConfig.hapi.yar || !gConfig.hapi.routes) {
    // hapi server
    gConfigError = 'Invalid hapi server configuration (' + JSON.stringify(gConfig.hapi) + ')';
  }
  else if(!gConfig.hapi.server.port || isNaN(gConfig.hapi.server.port) || gConfig.hapi.server.port <= 0) {
    // Server http port
    gConfigError = 'Invalid http port! (' + gConfig.hapi.server.port + ')';
  }
}

if(gConfigError !== null) {
  mUtilex.tidyLog(gConfigError);
  throw gConfigError;
}

// Init server
gServer = new mHapi.createServer('localhost', gConfig.hapi.server.port, gConfig.hapi.server.options);

// Init server plugins
gServer.pack.allow({ext: true}).require('yar', gConfig.hapi.yar.options, function(err) {
  if(err) {
    mUtilex.tidyLog('Yar plugin could not be initialized! (' + err + ')');
    throw err;
  }
});

// Init route helper
gRoute = mRoute({config: gConfig, server:gServer, pathScrDir: __dirname});

// Init event helper
gEvent = mEvent({server:gServer, isOnLog: true, isOnInternalError: true, isOnRequest: false, isOnResponse: false});

// Init server routes
gServer.route(gRoute.serverRoutes);

// Start server
gServer.start(function() {
  mUtilex.tidyLog('Server is listening on port ' + gServer.info.port);
});