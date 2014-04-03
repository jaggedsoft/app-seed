/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
/* jslint node: true */
'use strict';

var mUtilex = require('utilex'),
    mServer = require('./server'),
    mRoute  = require('./route'),
    mEvent  = require('./event')
;

// Init vars
var gServer,  // http server
    gConfig,  // config
    gRoute,   // route
    gEvent    // event
;

// Init config
gConfig = mUtilex.tidyConfig().config;

if(mUtilex.tidyConfig().error)                  throw (mUtilex.tidyConfig().error || "Unexpected error! (config)");
if(!gConfig.auth || !gConfig.auth.oauth2Client) throw 'Invalid oauth2 client configuration! (' + JSON.stringify(gConfig.auth) + ')';
if(!gConfig.hapi || !gConfig.hapi.server)       throw 'Invalid hapi server configuration! (' + JSON.stringify(gConfig.hapi) + ')';
if(!gConfig.hapi || !gConfig.hapi.yar)          throw 'Invalid hapi yar configuration! (' + JSON.stringify(gConfig.hapi) + ')';
if(!gConfig.hapi || !gConfig.hapi.routes)       throw 'Invalid hapi routes configuration! (' + JSON.stringify(gConfig.hapi) + ')';

// Init server
gServer = mServer({config: gConfig});
if(gServer.error || !gServer.server) throw (gServer.error || "Unexpected error! (server)");

// Init route
gRoute = mRoute({config: gConfig, server: gServer.server, pathScrDir: __dirname});

// Init event
gEvent = mEvent({server: gServer.server, isOnLog: true, isOnInternalError: true, isOnRequest: false, isOnResponse: false});

// Init server routes and start
gServer.server.route(gRoute.serverRoutes);
gServer.server.start(function() { mUtilex.tidyLog('Server is listening on port ' + gServer.server.info.port); });