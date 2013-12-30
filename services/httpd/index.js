/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
/* jslint node: true */
'use strict';

var mUtilex   = require('utilex'),    // utilex module
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
if(mUtilex.tidyConfig().error) throw (mUtilex.tidyConfig().error || "Unexpected error! (config)");

gConfig = mUtilex.tidyConfig().config;
if(!gConfig.auth || !gConfig.auth.oauth2Client)                                                   throw 'Invalid oauth2 client configuration! (' + JSON.stringify(gConfig.auth) + ')';
if(!gConfig.hapi || !gConfig.hapi.server || !gConfig.hapi.yar || !gConfig.hapi.routes)            throw 'Invalid hapi server configuration! (' + JSON.stringify(gConfig.hapi) + ')';
if(!gConfig.hapi.server.port || isNaN(gConfig.hapi.server.port) || gConfig.hapi.server.port <= 0) throw 'Invalid http port! (' + gConfig.hapi.server.port + ')';

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