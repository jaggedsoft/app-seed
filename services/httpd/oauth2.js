/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
'use strict';

var mGoogleAPIs = require('googleapis'); // googleapis module

// Init the module
exports = module.exports = function(iParam) {

  // Init vars
  var iConfig       = (iParam && iParam.config) ? iParam.config : null,
      iServer       = (iParam && iParam.server) ? iParam.server : null,
      redirectUrl,
      requestUrl
  ;

  // Redirect url
  if(!iConfig.auth.oauth2Client.redirectUrl) {
    iConfig.auth.oauth2Client.redirectUrl = iServer.info.uri + '/auth/google/callback';
  }

  // Request url
  if(!iConfig.auth.oauth2Client.requestUrl) {
    var oauth2Client = new mGoogleAPIs.OAuth2Client(iConfig.auth.oauth2Client.clientId, iConfig.auth.oauth2Client.clientSecret, iConfig.auth.oauth2Client.redirectUrl);

    iConfig.auth.oauth2Client.requestUrl = oauth2Client.generateAuthUrl({
      response_type: 'code',
      access_type: 'offline',
      approval_prompt: iConfig.auth.oauth2Client.approvalPrompt,
      state: '/login',
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
    });
  }

  // Returns redirect url
  redirectUrl = function() {
    return iConfig.auth.oauth2Client.redirectUrl;
  };

  // Returns requestUrl url
  requestUrl = function() {
    return iConfig.auth.oauth2Client.requestUrl;
  };

  // Return
  return {
    redirectUrl: redirectUrl,
    requestUrl: requestUrl
  };
};