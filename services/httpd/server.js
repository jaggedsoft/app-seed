/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
/* jslint node: true */
'use strict';

var mHapi = require('hapi');

// Init the module
exports = module.exports = function(iParam) {

  // Init vars
  var iConfig     = (iParam && iParam.config) ? iParam.config : null,
      configHapi  = (iConfig && iConfig.hapi) ? iConfig.hapi : null,

      serverInst, // server instance
      serverError // server error
  ;

  // Init server
  serverInst = new mHapi.createServer(configHapi.server.host, configHapi.server.port, configHapi.server.options);
  
  serverInst.pack.require('yar', configHapi.yar.options, function(err) {
    if(err) serverError = (err || "Unexpected error! (hapi.yar)");
  });

  // Return
  return {
    server: serverInst,
    error: serverError
  };
};