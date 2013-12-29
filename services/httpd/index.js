/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
/* jslint node: true */
'use strict';

var mUtilex   = require('./utilex'),  // utilex module
    mConfig   = require('./config'),  // config module
    mServer   = require('./server'),  // server module
    mRoute    = require('./route'),   // route module
    mEvent    = require('./event')    // event module
;

// Init vars
var gServer,  // http server
    gConfig,  // config helper
    gRoute,   // route helper
    gEvent    // event helper
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