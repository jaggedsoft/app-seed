/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
/* jslint node: true */
'use strict';

var mGoogleAPIs = require('googleapis'); // googleapis module

// Init the module
exports = module.exports = function(iParam) {

  // Init vars
  var iConfig             = (iParam && iParam.config) ? iParam.config : null,
      iServer             = (iParam && iParam.server) ? iParam.server : null,

      googleAPIs,         // Google APIs - function
      client,             // client for oauth2 - function
      redirectUrl,        // redirection url for oauth2 - function
      requestUrl,         // request url for oauth2 - function

      oauth2Client,
      oauth2ClientConfig  = (iConfig && iConfig.auth && iConfig.auth.oauth2Client) ? iConfig.auth.oauth2Client : null,
      serverInfo          = (iServer && iServer.info) ? iServer.info : null
  ;

  if(oauth2ClientConfig) {
    // Redirect url
    if(!oauth2ClientConfig.redirectUrl) {
      oauth2ClientConfig.redirectUrl = (serverInfo) ? serverInfo.uri + '/auth/google/callback' : null;
    }

    // oauth2 client
    oauth2Client = new mGoogleAPIs.OAuth2Client(oauth2ClientConfig.clientId, oauth2ClientConfig.clientSecret, oauth2ClientConfig.redirectUrl);

    // Request url
    if(!oauth2ClientConfig.requestUrl) {
      oauth2ClientConfig.requestUrl = oauth2Client.generateAuthUrl({
        response_type: 'code',
        access_type: 'offline',
        approval_prompt: oauth2ClientConfig.approvalPrompt,
        state: '/login',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
      });
    }
  }

  // Returns Google APIs module
  googleAPIs = function() {
    return mGoogleAPIs;
  }();

  // Returns oauth2 client
  client = function() {
    return (oauth2ClientConfig) ? oauth2Client : null;
  }();

  // Returns redirection url
  redirectUrl = function() {
    return (oauth2ClientConfig) ? oauth2ClientConfig.redirectUrl : null;
  };

  // Returns request url
  requestUrl = function() {
    return (oauth2ClientConfig) ? oauth2ClientConfig.requestUrl : null;
  };

  // Return
  return {
    googleAPIs: googleAPIs,
    client: client,
    redirectUrl: redirectUrl,
    requestUrl: requestUrl
  };
};