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
  var mOAuth2           = require('./oauth2'),  // oauth2 module
      mHapi             = require('hapi'),      // hapi module

      iConfig           = (iParam && iParam.config)     ? iParam.config : null,
      iServer           = (iParam && iParam.server)     ? iParam.server : null,
      iPathScrDir       = (iParam && iParam.pathScrDir) ? (iParam.pathScrDir + '') : null,

      serverRoutes,     // route array for server
      pathHandler,      // route handler function for app path
      sessIniter,       // route session initializer function
      sessTasker,       // route session tasker function

      configHapiRoutes  = (iConfig && iConfig.hapi && iConfig.hapi.routes) ? iConfig.hapi.routes : null,
      oauth2
  ;

  // Init oauth2 helper
  oauth2 = mOAuth2({config: iConfig, server:iServer});

  // Route handler for app path
  pathHandler = function(request) {
    
    // Check only if it is template
    if(((request.path + '').indexOf('/template/') === 0) === true) {

      // Init vars
      var reqPath       = (request.path + ''),
          routeAuthCnt  = (configHapiRoutes instanceof Array) ? configHapiRoutes.length : 0
      ;

      // Init session
      if(request.session.get('inited') === undefined) sessIniter(request, null, {isHandlerCall: false});

      // Check route auths
      for(var i = 0; i < routeAuthCnt; i++) {

        // If matches
        if(configHapiRoutes[i].match == reqPath) {

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
                "url": "/"
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
        userLoginUrl    = null,

        iIsHandlerCall  = (iParam && iParam.isHandlerCall === false)  ? true : false
    ;

    // Check vars
    inited        = (inited === true)             ? true                : false;
    hit           = (hit)                         ? parseInt(hit)       : null;
    hit           = (!isNaN(hit) && hit > 0)      ? hit+1               : 1;
    task          = (task instanceof Object)      ? task                : null;
    userIsLogin   = (userIsLogin === true)        ? true                : false;
    userId        = (userId)                      ? (userId + '')       : null;
    userEmail     = (userEmail)                   ? (userEmail + '')    : null;
    userNameFull  = (userNameFull)                ? (userNameFull + '') : null;
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

    // Reply
    if(iIsHandlerCall === false) {
      request.reply(requestReply);
    }
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
      path: '/sess/tasker',
      config: {
        jsonp: 'callback',
        handler: sessTasker
      }
    }
  ];

  // Return
  return {
    serverRoutes: serverRoutes,
    pathHandler: pathHandler,
    sessIniter: sessIniter,
    sessTasker: sessTasker
  };
};