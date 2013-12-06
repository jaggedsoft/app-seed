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
  var mGoogleAPIs       = require('googleapis'), // googleapis module

      iConfig           = (iParam && iParam.config) ? iParam.config : null,
      iServer           = (iParam && iParam.server) ? iParam.server : null,

      redirectUrl,
      requestUrl,

      configAuthClient  = (iConfig && iConfig.auth && iConfig.auth.oauth2Client) ? iConfig.auth.oauth2Client : null,
      serverInfo        = (iServer && iServer.info) ? iServer.info : null
  ;

  if(configAuthClient) {

    // Redirect url
    if(!configAuthClient.redirectUrl) {
      configAuthClient.redirectUrl = (serverInfo) ? serverInfo.uri + '/auth/google/callback' : null;
    }

    // Request url
    if(!configAuthClient.requestUrl) {
      var oauth2Client = new mGoogleAPIs.OAuth2Client(configAuthClient.clientId, configAuthClient.clientSecret, configAuthClient.redirectUrl);

      configAuthClient.requestUrl = oauth2Client.generateAuthUrl({
        response_type: 'code',
        access_type: 'offline',
        approval_prompt: configAuthClient.approvalPrompt,
        state: '/login',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
      });
    }
  }

  // Returns redirect url
  redirectUrl = function() {
    return (configAuthClient) ? configAuthClient.redirectUrl : null;
  };

  // Returns requestUrl url
  requestUrl = function() {
    return (configAuthClient) ? configAuthClient.requestUrl : null;
  };

  // Return
  return {
    redirectUrl: redirectUrl,
    requestUrl: requestUrl
  };
};