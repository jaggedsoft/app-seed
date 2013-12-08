## App Seed

  [app-seed](http://github.com/cmfatih/app-seed) is an application skeleton for web apps.  

  app-seed on [NPM Registry](http://npmjs.org/package/app-seed)

  **!!! APP-SEED IS STILL UNDER HEAVY DEVELOPMENT !!!**  

### Installation

For latest published version
```
npm install app-seed
```

or for HEAD version
```
git clone https://github.com/cmfatih/app-seed.git
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
  * Keep origin conventions of external libs for consistency.
  * Keep It Simple, Stupid (KISS)
  * Do One Thing, and do it well (DOT)
  * Don't Repeat Yourself (DRY)
  * Don't Make It Complicated, for a little benefit. (DMIC)

#### Coding

  * For naming convention; camelCase capitalization used
  * For file naming; words separated by `-` instead of `_`
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
find app-seed/ -type f -exec chmod 644 {} +
find app-seed/ -type d -exec chmod 755 {} +
chmod 775 app-seed/logs/
chmod 664 app-seed/logs/app.log
chmod 755 app-seed/scripts/app.sh
chmod 755 app-seed/scripts/app.js
```

#### File Structure

```
|- app
|   |- css                    : CSS files
|   |   |- app.css            : default CSS file
|   |- img                    : image files
|   |   |- favicon.ico        : icon file for browser / bookmarks
|   |- js                     : JS files
|   |   |- base               : base modules
|   |   |-  |- controller.js  : module for controllers
|   |   |-  |- routes.js      : module for routes
|   |   |-  |- services.js    : module for services
|   |   |- app.js             : default JS file
|   |- lib                    : 3rd party libraries
|   |   |- angular            : AngularJS library
|   |   |- misc               : html5shiv, respond.js
|   |- template               : template files
|   |   |- account.html       : partial HTML file for account page
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
|- package.json               : package file for NPM
|- CHANGELOG.md               : changelog file
|- LICENSE.txt                : license file
|- README.md                  : readme file
|- template-CHANGELOG.md      : template changelog file
|- template-LICENSE.txt       : template license file
|- template-README.md         : template readme file
```

### Changelog

For all notable changes see [CHANGELOG.md](https://github.com/cmfatih/app-seed/blob/master/CHANGELOG.md)

### License

Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
For the full copyright and license information, please view the LICENSE.txt file.  
Licensed under The MIT License (MIT)