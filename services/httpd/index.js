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

    mUtil           = require('./util'),        // util module
    mRoute          = require('./route'),       // route module
    mOAuth2         = require('./oauth2')       // oauth2 module
;

// Init vars
var gPathSep        = mPath.sep,                // path separator
    gPathCur        = mFS.realpathSync('.'),    // current path
    gPathScrFile    = __filename,               // script file path
    gPathScrDir     = __dirname,                // script path
    gConfig         = {},                       // config
    gConfigError    = null,                     // config error
    gConfigFile     = null,                     // config file
    gArgs           = process.argv,             // arguments
    gArgsCnt        = gArgs.length,             // arguments count
    gServer         = null,                     // http server
    gRoute          = null,                     // route handler
    gEnvNode        = null                      // environment mode
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
gEnvNode = (process.env.NODE_ENV !== undefined) ? process.env.NODE_ENV : null; // environment

if(!gConfigFile) {
  gConfigFile       = gPathScrDir + gPathSep + 'def-config.json';
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
  mUtil.tidyLog(gConfigError);
  throw gConfigError;
}

// Init server
gServer = new mHapi.createServer('localhost', gConfig.hapi.server.port, gConfig.hapi.server.options);

// Init server plugins
gServer.pack.allow({ext: true}).require('yar', gConfig.hapi.yar.options, function(err) {
  if(err) {
    mUtil.tidyLog('Yar plugin could not be initialized! (' + err + ')');
    throw err;
  }
});

// Init route helper
gRoute = mRoute({config: gConfig, server:gServer, pathScrDir: gPathScrDir});

// Init server routes
gServer.route([
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        listing: false,
        index: true,
        path: gRoute.defaultHandler
      }
    }
  },
  {
    method: 'GET',
    path: '/sess/init',
    config: {
      jsonp: 'callback',
      handler: gRoute.sessIniter
    }
  },
  {
    method: 'GET',
    path: '/sess/tasker',
    config: {
      jsonp: 'callback',
      handler: gRoute.sessTasker
    }
  }
]);

// Init server events
//+++ Should be control by config

gServer.on('log', function(event, tags) {
  mUtil.tidyLog('gServer.on.log: ' + (event.data || 'unspecified'));
});

gServer.on('internalError', function(request, err) {
  mUtil.tidyLog('gServer.on.internalError: ' + request.id + ' - ' + err.message);
});

/*
gServer.on('request', function(request, event, tags) {
  if(tags.error) {
    mUtil.tidyLog('gServer.on.request:error: ' + request.id + ' - ' + JSON.stringify(event));
  }
});
*/

/*
gServer.on('response', function(request) {
  mUtil.tidyLog('gServer.on.response: ' + request.id);
});
*/

// Start server
gServer.start(function() {
  mUtil.tidyLog('Server is listening on port ' + gServer.info.port);
});