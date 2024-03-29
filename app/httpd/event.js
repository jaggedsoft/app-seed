/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// TODO: Add callback feature for events instead of output.

// Init reqs
/* jslint node: true */
'use strict';

var mUtilex = require('utilex');

// Init the module
exports = module.exports = function(iParam) {

  // Init vars
  var iServer       = (iParam && iParam.server)                     ? iParam.server : null,
      iIsOnLog      = (iParam && iParam.isOnLog === true)           ? true : false,
      iIsOnIntrlErr = (iParam && iParam.isOnInternalError === true) ? true : false,
      iIsOnRequest  = (iParam && iParam.isOnRequest === true)       ? true : false,
      iIsOnResponse = (iParam && iParam.isOnResponse === true)      ? true : false,

      server        = (iServer && iServer.on) ? iServer : null
  ;

  // Init server events
  if(server) {
    // log
    if(iIsOnLog === true) {
      server.on('log', function(event, tags) {
        if(tags.error) {}
        
        mUtilex.tidyLog('gServer.on.log: ' + (event.data || 'unspecified'));
      });
    }

    // internal error
    if(iIsOnIntrlErr === true) {
      server.on('internalError', function(request, err) {
        mUtilex.tidyLog('gServer.on.internalError: ' + request.id + ' - ' + err.message);
      });
    }

    // request
    if(iIsOnRequest === true) {
      server.on('request', function(request, event, tags) {
        if(tags.error) {
          mUtilex.tidyLog('gServer.on.request:error: ' + request.id + ' - ' + JSON.stringify(event));
        }
      });
    }

    // response
    if(iIsOnResponse === true) {
      server.on('response', function(request) {
        mUtilex.tidyLog('gServer.on.response: ' + request.id);
      });
    }
  }

  // Return
  return {};
};