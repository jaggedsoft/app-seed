## App Seed

  [app-seed](http://github.com/cmfatih/app-seed) is an application skeleton for web apps.
  It uses [AngularJS](http://angularjs.org/) for front-end and [Node.js](http://nodejs.org/) 
  (with [hapi](http://hapijs.com/)) for back-end. It is suitable for Single Page Application (SPA) 
  and provides user authentication with [Google OAuth 2.0](https://developers.google.com/accounts/docs/OAuth2WebServer)

  app-seed on [npm registry](http://npmjs.org/package/app-seed)

### Installation

For latest published version
```
npm install app-seed
```

or for HEAD version
```
git clone https://github.com/cmfatih/app-seed.git
```

Create a copy of default config file. (the new config file will be ignored by git)
```
cp config/app.json config/test.json
```

Update `config/test.json` for Google OAuth2 authentication. 
```
"auth": {
  "oauth2Client": {
    "clientId": "CLIENTID",
    "clientSecret": "CLIENTSECRET",
    ...
    ...
```

For getting client id and client secret (if don't have any);  

1. Go to [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/accounts/docs/OAuth2#basicsteps) and read basic steps.
2. Go to [Google Cloud Console](https://cloud.google.com/console) and create a project.
3. Go to Project Name > APIs & auth > Registered apps and register new app. (Select *Web Applicaton* for platform.)
4. Go to Project Name > APIs & auth > Registered apps > Your App Name and click *OAuth 2.0 Client ID* tab.
5. Type `http://localhost:12080/` to *web origin* and `http://localhost:12080/auth/google/callback` to *redirect uri*
6. Click to *Generate* button. (It will update client secret)
7. Update *CLIENT ID* and *CLIENT SECRET* at `config/test.json`

### Usage

#### Test
```
npm test
```

#### Example
```
node ./services/httpd/index.js -c config/test.json
```

Go to [http://localhost:12080/](http://localhost:12080/)

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
    - `('' + var)`
    - `.toString()`
  * is array:
    - `(var instanceof Array)`
    - `(Object.prototype.toString.call(var) === '[object Array]')`
  * is object:
    - `(var && typeof var === 'object')`
  * is function:
    - `(var && typeof var === 'function')`

#### Permissions

```
find ../app-seed/ -type f -exec chmod 644 {} +
find ../app-seed/ -type d -exec chmod 755 {} +
chmod 775 ../app-seed/logs/
chmod 664 ../app-seed/logs/app.log
chmod 755 ../app-seed/scripts/app.sh
chmod 755 ../app-seed/scripts/app.js
```

#### File Structure

```
|- app
|   |- css                      : CSS files
|   |   |- app.css              : default CSS file
|   |- img                      : image files
|   |- js                       : JS files
|   |   |- base                 : base modules
|   |   |-  |- controller.js    : module for controllers
|   |   |-  |- directives.js    : module for directives
|   |   |-  |- routes.js        : module for routes
|   |   |-  |- services.js      : module for services
|   |   |- app.js               : default JS file
|   |- lib                      : 3rd party libraries
|   |   |- angular              : AngularJS library
|   |   |- misc                 : html5shiv, respond.js
|   |- template                 : template files
|   |   |- account.html         : partial HTML file for account page
|   |   |- home.html            : partial HTML file for home page
|   |   |- login.html           : partial HTML file for login page
|   |   |- logout.html          : partial HTML file for logout page
|   |   |- nav.html             : partial HTML file for navigation
|   |- favicon.ico              : icon file for browser / bookmarks
|   |- index.html               : index HTML file for app layout
|- config                       : config files
|   |- app.json                 : default config file
|- logs                         : log files
|   |- app.log                  : default log file
|- scripts                      : script files for shell, cron, js, etc...
|   |- app.bat                  : default shell script for WIN platform
|   |- app.js                   : default shell script for Node.js
|   |- app.sh                   : default shell script for POSIX platforms
|- services                     : services
|   |- httpd                    : httpd service
|- test                         : test files
|   |- test-all.js              : default test file
|- .gitattributes               : attributes for GIT
|- .gitignore                   : ignore settings for GIT
|- .jshintrc                    : config for JSHint
|- .npmignore                   : ignore settings for NPM
|- package.json                 : package file for NPM
|- README.md                    : readme file
|- CHANGELOG.md                 : changelog file
|- LICENSE.txt                  : license file
|- template-CHANGELOG.md        : template changelog file
|- template-LICENSE.txt         : template license file
|- template-README.md           : template readme file
```

### Changelog

For all notable changes see [CHANGELOG.md](https://github.com/cmfatih/app-seed/blob/master/CHANGELOG.md)

### License

Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
For the full copyright and license information, please view the LICENSE.txt file.  
Licensed under The MIT License (MIT)