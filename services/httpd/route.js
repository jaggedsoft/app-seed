/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
/* jslint node: true */
'use strict';

var mHapi   = require('hapi'),    // hapi module
    mOAuth2 = require('./oauth2') // oauth2 module
;

// Init the module
exports = module.exports = function(iParam) {

  // Init vars
  var iConfig           = (iParam && iParam.config)     ? iParam.config : null,
      iServer           = (iParam && iParam.server)     ? iParam.server : null,
      iPathScrDir       = (iParam && iParam.pathScrDir) ? ('' + iParam.pathScrDir) : null,

      serverRoutes,     // route array for server
      pathHandler,      // route handler for app path - function
      sessIniter,       // route handler for session initializer - function
      sessDeiniter,     // route handler for de-initializer - function
      sessTasker,       // route handler for session tasker - function
      oauth2CB,         // route handler for oauth2 callback - function

      configHapiRoutes  = (iConfig && iConfig.hapi && iConfig.hapi.routes) ? iConfig.hapi.routes : null,
      oauth2
  ;

  // Init oauth2 helper
  oauth2 = mOAuth2({config: iConfig, server: iServer});

  // Route handler for app path
  pathHandler = function(request) {  
    // Check only if it is template
    if((('' + request.path).indexOf('/template/') === 0) === true) {

      // Init vars
      var reqPath       = ('' + request.path),
          routeAuthCnt  = (configHapiRoutes instanceof Array) ? configHapiRoutes.length : 0
      ;

      // Init session
      if(request.session.get('inited') === undefined) sessIniter(request, null, {isHandlerCall: false});

      // Check route auths
      for(var i = 0; i < routeAuthCnt; i++) {

        // If matches
        if(configHapiRoutes[i].match === reqPath) {

          // Init vars
          var tMatch      = configHapiRoutes[i],
              tRoles      = (tMatch.auth && tMatch.auth.roles instanceof Array) ? tMatch.auth.roles : [],
              tNoIsLogin  = (tMatch.auth && tMatch.auth.noIsLogin === true)     ? true              : false,
              task        = request.session.get('task'),
              userIsLogin = request.session.get('user.isLogin'),
              userRoles   = request.session.get('user.roles')
          ;

          // Check vars
          task        = (task instanceof Object)      ? task      : null;   // Keep this for multi task
          userIsLogin = (userIsLogin === true)        ? true      : false;
          userRoles   = (userRoles instanceof Array)  ? userRoles : [];

          // If there is a role
          if(tRoles.length > 0) {
            // Init vars
            var tErrTrig = true;

            // Check user
            if(userIsLogin === true) {
              for(var j = 0; j < userRoles.length; j++) {
                if(tRoles.indexOf(userRoles[j]) > -1) {
                  tErrTrig  = false;
                  break;
                }
              }

              // Access denied due role
              if(tErrTrig === true) {
                // Set session task for client side
                task = {
                  "type": "alert",
                  "option": {
                    "kind": "error",
                    "message": "You don't have access to the page."
                  }
                };
                request.session.set('task', task);
                request.reply(mHapi.error.forbidden('Access denied'));
              }
            }
            else {
              // Access denied due login
              // Set session task for client side
              task = {
                "type": "redirect",
                "option": {
                  "kind": "error",
                  "message": "Login required.",
                  "url": "/login"
                }
              };
              request.session.set('task', task);
              request.reply(mHapi.error.forbidden('Login required'));
            }
          }

          // Forwarding
          if(userIsLogin === true && tNoIsLogin === true) {
            // Set session task for client side
            task = {
              "type": "redirect",
              "option": {
                "kind": "warning",
                "message": "You are already login.",
                "url": "/account"
              }
            };

            request.session.set('task', task);
            request.reply(mHapi.error.forbidden('You are already login.'));
          }

          break;
        }
      }
    }

    return iPathScrDir + '/../../app';
  };

  // Route handler for session initializer
  sessIniter = function(request, next, iParam) {
    // Init vars
    var requestReply    = {},
        inited          = request.session.get('inited'),
        hit             = request.session.get('hit'),
        task            = request.session.get('task'),
        userIsLogin     = request.session.get('user.isLogin'),
        userId          = request.session.get('user.id'),
        userEmail       = request.session.get('user.email'),
        userNameFull    = request.session.get('user.name.full'),
        userRoles       = request.session.get('user.roles'),
        userLoginUrl,

        iIsHandlerCall  = (iParam && iParam.isHandlerCall === false)  ? true : false
    ;

    // Check vars
    inited        = (inited === true)             ? true                : false;
    hit           = (hit)                         ? parseInt(hit)       : null;
    hit           = (!isNaN(hit) && hit > 0)      ? hit+1               : 1;
    task          = (task instanceof Object)      ? task                : null;
    userIsLogin   = (userIsLogin === true)        ? true                : false;
    userId        = (userId)                      ? ('' + userId)       : null;
    userEmail     = (userEmail)                   ? ('' + userEmail)    : null;
    userNameFull  = (userNameFull)                ? ('' + userNameFull) : null;
    userRoles     = (userRoles instanceof Array)  ? userRoles           : null;

    // If not login
    if(userIsLogin === false) {
      if(oauth2 && oauth2.requestUrl && typeof oauth2.requestUrl === 'function') {
        userLoginUrl = oauth2.requestUrl();
      }
    }

    // Set session vars
    request.session.set('inited', true);
    request.session.set('hit', hit);

    // Set once
    if(inited === false) {
      request.session.set('task', task);

      request.session.set('user.isLogin', userIsLogin);
      request.session.set('user.id', userId);
      request.session.set('user.email', userEmail);
      request.session.set('user.name.full', userNameFull);
      request.session.set('user.roles', userRoles);
    }

    // Reply
    requestReply = {
      "inited": inited,
      "hit": hit,
      "task": task,
      "user": {
        "isLogin": userIsLogin,
        "id": userId,
        "email": userEmail,
        "nameFull": userNameFull,
        "roles": userRoles,
        "loginUrl": userLoginUrl
      }
    };

    if(iIsHandlerCall === false) {
      request.reply(requestReply);
    }
  };

  // Route handler for de-initialization
  sessDeiniter = function(request) {
    // Init vars
    var requestReply    = {},
        task            = request.session.get('task'),
        userIsLogin     = request.session.get('user.isLogin'),
        userLoginUrl
    ;

    // Check vars
    if(oauth2 && oauth2.requestUrl && typeof oauth2.requestUrl === 'function') {
      userLoginUrl = oauth2.requestUrl();
    }

    // Set session vars
    request.session.set('inited', false);
    request.session.set('hit', null);

    if(userIsLogin === true) {
      request.session.set('task', task);

      request.session.set('user.isLogin', false);
      request.session.set('user.id', null);
      request.session.set('user.email', null);
      request.session.set('user.name.full', null);
      request.session.set('user.roles', null);
    }

    // Reply
    requestReply = {
      "inited": false,
      "hit": null,
      "task": task,
      "user": {
        "isLogin": false,
        "id": null,
        "email": null,
        "nameFull": null,
        "roles": null,
        "loginUrl": userLoginUrl
      }
    };

    request.reply(requestReply);
  };

  // Route handler for session tasker
  sessTasker = function(request) {
    // Init vars
    var requestReply  = {},
        inited        = request.session.get('inited'),
        hit           = request.session.get('hit'),
        task          = request.session.get('task')
    ;

    // Check vars
    inited  = (inited === true)         ? true          : false;
    hit     = (hit)                     ? parseInt(hit) : null;
    hit     = (!isNaN(hit) && hit > 0)  ? hit+1         : 1;
    task    = (task instanceof Object)  ? task          : null;

    // Set session vars
    if(inited === true) {
      request.session.set('hit', hit);
      request.session.set('task', null); // Clear current task
    }
    else {
      task = null; // Do not return task if session is not initialized
    }

    // Reply
    requestReply = {"task": task};

    request.reply(requestReply);
  };

  // Route handler for oauth2 callback
  oauth2CB = function(request) {
    // Init vars
    var requestReply  = {},
        task          = request.session.get('task'),
        queryState    = request.query.state,
        queryCode     = request.query.code,
        queryError    = request.query.error
    ;

    // Check vars
    task = (task instanceof Object) ? task : null; // Keep this for multi task

    if(!queryError && queryCode) {
      // Get tokens
      oauth2.client.getToken(queryCode, function(err, tokens) {
        if(!err) {
          // Init vars
          var token           = {};
              token.access    = (tokens.access_token || null);
              token.refresh   = (tokens.refresh_token || null);
              token.type      = (tokens.token_type || null);
              token.expiresIn = (tokens.expires_in || null);
          // TODO: Store token info somewhere

          // Set credentials
          oauth2.client.credentials = {access_token: token.access, refresh_token: token.refresh};

          // Execute API request
          oauth2.googleAPIs.discover('oauth2', 'v2').execute(function(err, client) {
              if(!err) {
                // Get user info
                client.oauth2.userinfo.get().withAuthClient(oauth2.client).execute(function(err, results) {
                  
                  if(!err) {
                    // Init vars
                    var ui                = {};
                        ui.id             = (results.id || null);
                        ui.email          = (results.email || null);
                        ui.emailVerified  = (results.verified_email || null);
                        ui.name           = (results.name || null);
                        ui.nameFirst      = (results.given_name || null);
                        ui.nameLast       = (results.family_name || null);
                        ui.locale         = (results.locale || null);
                    // TODO: Store user info somewhere

                    // Set session vars
                    
                    // TODO: Update this code block after user db implementation
                    request.session.set('user.isLogin', true);
                    request.session.set('user.id', ui.id);
                    request.session.set('user.email', ui.email);
                    request.session.set('user.name.full', ui.name);
                    request.session.set('user.roles', ['user']);

                    request.reply.redirect('/#/account');
                  }
                  else {
                    // API get error
                    task = {
                      "type": "alert",
                      "option": {
                        "kind": "error",
                        "message": "App approval error. (" + err + ")"
                      }
                    };
                    request.session.set('task', task);
                    request.reply.redirect('/#/login');
                  }
                });
              }
              else {
                // API error
                task = {
                  "type": "alert",
                  "option": {
                    "kind": "error",
                    "message": "App approval error. (" + err + ")"
                  }
                };
                request.session.set('task', task);
                request.reply.redirect('/#/login');
              }
          });
        }
        else {
          // Token error
          task = {
            "type": "alert",
            "option": {
              "kind": "error",
              "message": "App approval error. (" + err + ")"
            }
          };
          request.session.set('task', task);
          request.reply.redirect('/#/login');
        }
      });
    }
    else {
      // Access denied due approval
      task = {
        "type": "alert",
        "option": {
          "kind": "error",
          "message": "App approval required. (" + queryError + ")"
        }
      };
      request.session.set('task', task);
      request.reply.redirect('/#/login');
    }
  };

  // Server routes
  serverRoutes = [
    {
      method: 'GET',
      path: '/{path*}',
      handler: {
        directory: {
          listing: false,
          index: true,
          path: pathHandler
        }
      }
    },
    {
      method: 'GET',
      path: '/sess/init',
      config: {
        jsonp: 'callback',
        handler: sessIniter
      }
    },
    {
      method: 'GET',
      path: '/sess/deinit',
      config: {
        jsonp: 'callback',
        handler: sessDeiniter
      }
    },
    {
      method: 'GET',
      path: '/sess/tasker',
      config: {
        jsonp: 'callback',
        handler: sessTasker
      }
    },
    {
      method: 'GET',
      path: '/auth/google/callback',
      config: {
        jsonp: 'callback',
        handler: oauth2CB
      }
    }
  ];

  // Return
  return {
    pathHandler: pathHandler,
    sessIniter: sessIniter,
    sessDeiniter: sessDeiniter,
    sessTasker: sessTasker,
    oauth2CB: oauth2CB,
    serverRoutes: serverRoutes
  };
};