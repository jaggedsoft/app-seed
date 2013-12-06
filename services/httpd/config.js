/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
'use strict';

// Init the module
exports = module.exports = function() {

  // Init vars
  var mFS           = require('fs'),        // fs module
      mUtilex       = require('./utilex'),  // utilex module

      configData,   // config data
      configError,  // config error

      args          = mUtilex.tidyArgs()    // arguments
  ;

  // Check config file
  if(!args.configFile) {
    args.configFile = __dirname + mUtilex.pathSep + 'def-config.json';
  }

  // Read config file
  if(args.configFile) {
    if(mFS.existsSync(args.configFile)) {
      try {
        configData  = JSON.parse(mFS.readFileSync(args.configFile));
      }
      catch(e) {
        configError = 'Invalid configuration file. (' + args.configFile + ') (' + e + ')';
      }
    }
    else {
      configError   = 'Configuration file could not be read. (' + args.configFile + ')';
    }
  }

  // Check config
  if(configError === null) {
    if(!configData.auth || !configData.auth.oauth2Client) {
      // oauth2
      configError = 'Invalid oauth2 client configuration (' + JSON.stringify(configData.auth) + ')';
    }
    else if(!configData.hapi || !configData.hapi.server || !configData.hapi.yar || !configData.hapi.routes) {
      // hapi server
      configError = 'Invalid hapi server configuration (' + JSON.stringify(configData.hapi) + ')';
    }
    else if(!configData.hapi.server.port || isNaN(configData.hapi.server.port) || configData.hapi.server.port <= 0) {
      // server http port
      configError = 'Invalid http port! (' + configData.hapi.server.port + ')';
    }
  }

  // Return
  return {
    config: configData,
    error: configError
  };
}();