/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
'use strict';

var mHapi     = require('hapi'),      // hapi module
    mUtilex   = require('./utilex'),  // utilex module
    mConfig   = require('./config'),  // config module
    mOAuth2   = require('./oauth2'),  // oauth2 module
    mServer   = require('./server'),  // server module
    mRoute    = require('./route'),   // route module
    mEvent    = require('./event')    // event module
;

// Init vars
var gServer   = null, // http server
    gConfig   = null, // config helper
    gRoute    = null, // route helper
    gEvent    = null  // event helper
;

// Check config
if(mConfig.error || !mConfig.config) throw (mConfig.error || "Unexpected error! (config)");
gConfig = mConfig.config;

// Init server
gServer = mServer({config: gConfig});

// Check server
if(gServer.error || !gServer.server) throw (gServer.error || "Unexpected error! (server)");

// Init route helper
gRoute  = mRoute({config: gConfig, server: gServer.server, pathScrDir: __dirname});

// Init event helper
gEvent  = mEvent({server: gServer.server, isOnLog: true, isOnInternalError: true, isOnRequest: false, isOnResponse: false});

// Init server routes and start
gServer.server.route(gRoute.serverRoutes);
gServer.server.start(function() { mUtilex.tidyLog('Server is listening on port ' + gServer.server.info.port); });