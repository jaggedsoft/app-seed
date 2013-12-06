/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
'use strict';

// Init the module
exports = module.exports = function(iParam) {

  // Init vars
  var mHapi         = require('hapi'), // hapi module

      iConfig       = (iParam && iParam.config) ? iParam.config : null,

      serverInst,   // server instance
      serverError,  // server error

      configHapi    = (iConfig && iConfig.hapi) ? iConfig.hapi : null
  ;

  // Init server
  serverInst = new mHapi.createServer('localhost', configHapi.server.port, configHapi.server.options);
  
  serverInst.pack.allow({ext: true}).require('yar', configHapi.yar.options, function(err) {
    if(err) serverError = (err || "Unexpected error! (hapi.yar)");
  });

  // Return
  return {
    server: serverInst,
    error: serverError
  };
};