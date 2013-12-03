#!/usr/bin/env node

// Init reqs
var mFS           = require('fs'),    // fs module
    mPath         = require('path')   // path module
;

// Init vars
var gPathSep      = mPath.sep,              // path separator
    gPathCur      = mFS.realpathSync('.'),  // current path
    gPathScrFile  = __filename,             // script file path
    gPathScrDir   = __dirname               // script path
;

console.log('\u001B[2J\u001B[0;0f');        // clear console
