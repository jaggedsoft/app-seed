/*
 * App Seed
 * Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

// Init reqs
'use strict';

var mFS             = require('fs'),            // fs module
    mPath           = require('path'),          // path module
    mHapi           = require('hapi'),          // hapi module
    mGoogleAPIs     = require('googleapis'),    // googleapis module

    mUtil           = require('./util')         // util module
;

// Init vars
var gPathSep        = mPath.sep,                // path separator
    gPathCur        = mFS.realpathSync('.'),    // current path
    gPathScrFile    = __filename,               // script file path
    gPathScrDir     = __dirname,                // script path
    gConfig         = {},                       // config
    gConfigError    = null,                     // config error
    gConfigFile     = null,                     // config file
    gArgs           = process.argv,             // arguments
    gArgsCnt        = gArgs.length,             // arguments count
    gServer         = null,                     // http server
    gRoutes         = [],                       // routes
    gSessIniter     = null,                     // session initializer function
    gSessTasker     = null,                     // session tasker function
    gOAuth2Client   = mGoogleAPIs.OAuth2Client, // oauth2 client
    gEnvNode        = (process.env.NODE_ENV !== undefined) ? process.env.NODE_ENV : null // environment
;

// Init Argv
if(gArgsCnt > 2) {
  for(var i = 2; i < gArgsCnt; i++) {
    switch(gArgs[i]) {
      case "-c":
      case "--configFile":
        gConfigFile  = (gArgs[++i] + '').trim();
        break;
      default:
        console.log("Invalid argument! (" + gArgs[i] + ")");
        process.exit(0);
        break;
    }
  }
}

// Check config
if(!gConfigFile) {
  gConfigFile = gPathScrDir + gPathSep + 'def-config.json';
}

if(gConfigFile) {
  if(mFS.existsSync(gConfigFile)) {
    try {
      gConfig       = JSON.parse(mFS.readFileSync(gConfigFile));
    }
    catch(e) {
      gConfigError  = 'Invalid configuration file. (' + gConfigFile + ') (' + e + ')';
    }
  }
  else {
    gConfigError    = 'Configuration file could not be read. (' + gConfigFile + ')';
  }
}

if(gConfigError === null) {
  
  // Check config
  if(!gConfig.auth || !gConfig.auth.oauth2Client) {
    // oauth2
    gConfigError = 'Invalid oauth2 client configuration (' + JSON.stringify(gConfig.auth) + ')';
  }
  else if(!gConfig.hapi || !gConfig.hapi.server || !gConfig.hapi.yar || !gConfig.hapi.routes) {
    // hapi server
    gConfigError = 'Invalid hapi server configuration (' + JSON.stringify(gConfig.hapi) + ')';
  }
  else if(!gConfig.hapi.server.port || isNaN(gConfig.hapi.server.port) || gConfig.hapi.server.port <= 0) {
    // Server http port
    gConfigError = 'Invalid http port! (' + gConfig.hapi.server.port + ')';
  }
}

if(gConfigError !== null) {
  mUtil.tidyLog(gConfigError);
  throw gConfigError;
}

// Create server
gServer = new mHapi.createServer('localhost', gConfig.hapi.server.port, gConfig.hapi.server.options);

// Init yar plugin
gServer.pack.allow({ext: true}).require('yar', gConfig.hapi.yar.options, function(err) {
  if(err) {
    mUtil.tidyLog('Yar plugin could not be initialized! (' + err + ')');
    throw err;
  }
});

// Init server routes

// Route handler for session initializer
gSessIniter = function(request, next, isHandlerCall) {
  // Init vars
  var requestReply  = {},
      inited        = request.session.get('inited'),
      hit           = request.session.get('hit'),
      task          = request.session.get('task'),
      userIsLogin   = request.session.get('user.isLogin'),
      userId        = request.session.get('user.id'),
      userEmail     = request.session.get('user.email'),
      userNameFull  = request.session.get('user.name.full'),
      userRoles     = request.session.get('user.roles')
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

  // Set session vars
  request.session.set('inited', true);
  request.session.set('hit', hit);

  if(inited === false) {
    // Set once
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
      "roles": userRoles
    }
  };

  // Generate login url
  if(userIsLogin === false) {
    if(!gConfig.auth.oauth2Client.redirectUrl) gConfig.auth.oauth2Client.redirectUrl = gServer.info.uri + '/auth/google/callback';

    var oAuth2ClientInst = new gOAuth2Client(gConfig.auth.oauth2Client.clientId, gConfig.auth.oauth2Client.clientSecret, gConfig.auth.oauth2Client.redirectUrl);

    if(!gConfig.auth.oauth2Client.requestUrl) {
      gConfig.auth.oauth2Client.requestUrl  = oAuth2ClientInst.generateAuthUrl({
        response_type: 'code',
        access_type: 'offline',
        approval_prompt: gConfig.auth.oauth2Client.approvalPrompt,
        state: '/login',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
      });
    }

    requestReply.user.loginUrl = gConfig.auth.oauth2Client.requestUrl;
  }

  //mUtil.tidyLog("request.session:" + JSON.stringify(request.session)); // for debug
  //mUtil.tidyLog("requestReply:" + JSON.stringify(requestReply));       // for debug

  // Reply
  if(isHandlerCall === undefined || isHandlerCall !== false) {
    request.reply(requestReply);
  }
};

// Route handler for session tasker
gSessTasker = function (request) {
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

// Default route for static files
gRoutes = [
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        listing: false,
        index: true,
        path: function(request) {
          //mUtil.tidyLog('request.params:' + JSON.stringify(request.params));  // for debug
          //mUtil.tidyLog('request.path:' + JSON.stringify(request.path));      // for debug

          // Check only if it is template
          if(((request.path + '').indexOf('/template/') === 0) === true) {

            // Init vars
            var reqPath       = (request.path + ''),
                routeAuthCnt  = (gConfig.hapi.routes instanceof Array) ? gConfig.hapi.routes.length : 0
            ;

            // Init session
            if(request.session.get('inited') === undefined) gSessIniter(request, null, false);

            // Check route auths
            for(var i = 0; i < routeAuthCnt; i++) {

              // If matches
              if(gConfig.hapi.routes[i].match == reqPath) {

                // Init vars
                var tMatch      = gConfig.hapi.routes[i],
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

                  //mUtil.tidyLog('task:' + JSON.stringify(task));  // for debug

                  request.session.set('task', task);
                  request.reply(mHapi.error.forbidden('You are already login.'));
                }

                break;
              }
            }
          }

          return gPathScrDir + '/../../app';
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/sess/init',
    config: {
      jsonp: 'callback',
      handler: gSessIniter
    }
  },
  {
    method: 'GET',
    path: '/sess/tasker',
    config: {
      jsonp: 'callback',
      handler: gSessTasker
    }
  }
];

// Init server events

//+++ Should be control by config

gServer.on('log', function(event, tags) {
  mUtil.tidyLog('gServer.on.log: ' + (event.data || 'unspecified'));
});

gServer.on('internalError', function(request, err) {
  mUtil.tidyLog('gServer.on.internalError: ' + request.id + ' - ' + err.message);
});

/*
gServer.on('request', function(request, event, tags) {
  if(tags.error) {
    mUtil.tidyLog('gServer.on.request:error: ' + request.id + ' - ' + JSON.stringify(event));
  }
});
*/

/*
gServer.on('response', function(request) {
  mUtil.tidyLog('gServer.on.response: ' + request.id);
});
*/

// Start server
gServer.route(gRoutes);

gServer.start(function() {
  mUtil.tidyLog('Server is listening on port ' + gServer.info.port);
});