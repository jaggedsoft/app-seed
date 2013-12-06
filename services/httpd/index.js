/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
'use strict';

var mHapi           = require('hapi'),      // hapi module
    mUtilex         = require('./utilex'),  // utilex module
    mConfig         = require('./config'),  // config module
    mRoute          = require('./route'),   // route module
    mEvent          = require('./event'),   // event module
    mOAuth2         = require('./oauth2')   // oauth2 module
;

// Init vars
var gServer         = null, // http server
    gConfig         = null, // config helper
    gRoute          = null, // route helper
    gEvent          = null  // event helper
;

// Check config
if(mConfig.configError || !mConfig.config) {
  throw (mConfig.configError || "Unexpected error! (config)");
}
else {
  gConfig = mConfig.config;
}

// Init server
gServer = new mHapi.createServer('localhost', gConfig.hapi.server.port, gConfig.hapi.server.options);
gServer.pack.allow({ext: true}).require('yar', gConfig.hapi.yar.options, function(err) {
  if(err) throw (err || "Unexpected error! (hapi.yar)");
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