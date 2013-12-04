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
|   |   |- jquery
|   |   |- misc
|   |- template               : template files
|   |   |- home.html          : partial HTML file for home page
|   |   |- login.html         : partial HTML file for login page
|   |- favicon.ico            : icon file for browser / bookmarks
|   |- index.html             : index HTML file for app layout
|- config                     : config files
|   |- app.json               : default config file
|- logs                       : log files
|   |- app.log                : default log file
|- scripts                    : script files for shell, cron, js, etc...
|   |- app.bat                : default shell script for WIN platform
|   |- app.js                 : default shell script for Node.js
|   |- app.sh                 : default shell script for POSIX platforms
|- services                   : services
|   |- httpd                  : httpd service
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

Notable changes

```
  * 20131204 -  Bootstrap removed
                CHANGELOG.md
  * 20131204 -  AngularJS 1.2.3
                services/httpd
```

for all notable changes see [CHANGELOG.md](blob/master/CHANGELOG.md)

### License

Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.