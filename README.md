## App Seed

  [app-seed](http://github.com/cmfatih/app-seed) is an application skeleton for web apps.  

  **!!! APP-SEED IS STILL UNDER HEAVY DEVELOPMENT !!!**  

### Installation

```
npm install app-seed
```

### Usage

```
npm start
```

### Notes

#### App Design goals

  * Use JavaScript
  * Use Node.js
  * Make it standalone.
  * Choose best community supported framework, lib, etc. if necessary.
  * Stay away from dependency for fundamental features.
  * Keep It Simple, Stupid (KISS)
  * Do One Thing, and do it well (DOT)
  * Don't Repeat Yourself (DRY)
  * Don't Make It Complicated, for a little benefit. (DMIC)

#### Coding

  * For closures; named function expressions used due benefits such as recursion.
  * Variables (including closures) defined first due hoisting.
  * "m" prefix used for module variables.
  * "g" prefix used for global variables.
  * "t" prefix used for temp (has generic name) variables.
  * "i" prefix used for function (global) arguments.
  * to string:
    - `(var + '')`
    - `.toString()`
  * is array:
    - `!(var instanceof Array)`
    - `(Object.prototype.toString.call(var) === '[object Array]')`
  * is function:
    - `(var !== undefined && typeof var === 'function')`

#### Permissions

```
find . -type f -exec chmod 644 {} +
find . -type d -exec chmod 755 {} +
chmod 775 logs/
chmod 664 logs/app.log
chmod 755 scripts/app.sh
chmod 755 scripts/app.js
```

#### File Structure

```
|- app
|   |- css                    : CSS files
|   |   |- app.css            : default CSS file
|   |- img                    : image files
|   |   |- favicon.ico        : icon file for browser / bookmarks
|   |- js                     : JS files
|   |   |- app.js             : default JS file
|   |- lib                    : 3rd party libraries
|   |   |- angular
|   |   |- bootstrap
|   |   |- jquery
|   |   |- misc
|   |       |- html5shiv.js 
|   |       |- respond.js
|   |- template               : template files
|   |   |- home.html          : partial HTML file for home page
|   |- favicon.ico            : icon file for browser / bookmarks
|   |- index.html             : index HTML file for app layout
|- config                     : config files
|   |- app.json               : default config file
|   |- dev.json               : config file for development environment
|   |- prod.json              : config file for production environment
|   |- test.json              : config file for test environment
|- logs                       : log files
|   |- app.log                : default app log file
|- scripts                    : script files for shell, cron, js, etc...
|   |- app.bat                : default shell script for WIN platform
|   |- app.js                 : default shell script for Node.js
|   |- app.sh                 : default shell script for POSIX platforms
|- test                       : test files
|   |- test-all.js            : default test file
|- .gitattributes             : attributes for GIT
|- .gitignore                 : ignore settings for GIT
|- .jshintrc                  : config for JSHint
|- .npmignore                 : ignore settings for NPM
|- LICENSE.txt                : license file
|- package.json               : package file for NPM
|- README.md                  : readme file
|- template-LICENSE.txt       : template license file
|- template-README.md         : template readme file
```

### Changelog

```
  * 20131109 -  AngularJS 1.2.0
  * 20131106 -  Bootstrap 3.0.2
  * 20131104 -  Simple http server (scripts/app.js)
  * 20131030 -  Bootstrap 3.0.1
  * 20131026 -  the version declaration: 0.0.1
                package.json
  * 20131020 -  README file
                Default config files.
  * 20131014 -  AngularJS 1.2.0-rc.2
                Bootstrap 3.0.0
                jQuery 1.10.2
                html5shiv
                respond
                README and LICENSE files
```

### License

Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.