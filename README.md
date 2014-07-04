#### ! DEPRECATED - NO LONGER DEVELOPED !  

## App Seed
[![NPM][npm-image]][npm-url]

[app-seed](http://github.com/cmfatih/app-seed) is an application skeleton for web apps.
It uses AngularJS for front-end and Node.js (hapi framework) for back-end. 
It is suitable for Single Page Application (SPA) and provides user authentication with Google OAuth 2.0  

### Installation

For latest release
```
npm install app-seed
```

For HEAD
```
git clone https://github.com/cmfatih/app-seed.git
```

#### Config

Create a copy of default config file. (the new config file will be ignored by git)
```
cp config/app.json config/test.json
```

For getting client id and client secret (if don't have any);  

1. Go to [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/accounts/docs/OAuth2#basicsteps) and read basic steps.
2. Go to [Google Cloud Console](https://cloud.google.com/console) and create a project.
3. Go to Project Name > APIs & auth > Registered apps and register new app. (Select *Web Applicaton* for platform.)
4. Go to Project Name > APIs & auth > Registered apps > Your App Name and click *OAuth 2.0 Client ID* tab.
5. Type `http://localhost:12080/` to *web origin* and `http://localhost:12080/auth/google/callback` to *redirect uri*
6. Click to *Generate* button. (It will update client secret)
7. Update *CLIENT ID* and *CLIENT SECRET* at `config/test.json`

Update `config/test.json` for Google OAuth2 authentication. 
```
"auth": {
  "oauth2Client": {
    "clientId": "CLIENTID",
    "clientSecret": "CLIENTSECRET",
    ...
    ...
```

### Usage

#### Starting app

Default config file (config/app.json)
```
npm start
```

Custom config file
```
node ./app/httpd/index.js -c config/test.json
```

See `http://localhost:12080/`

### Notes

* For issues see [Issues](https://github.com/cmfatih/app-seed/issues)

#### File Structure

```
|- app
|   |- httpd                        : httpd service
|   |- www                          : www
|   |   |- css                      : CSS files
|   |   |   |- app.css              : default CSS file
|   |   |- img                      : image files
|   |   |- js                       : JS files
|   |   |   |- base                 : base modules
|   |   |   |-  |- controller.js    : module for controllers
|   |   |   |-  |- directives.js    : module for directives
|   |   |   |-  |- routes.js        : module for routes
|   |   |   |-  |- services.js      : module for services
|   |   |   |- app.js               : default JS file
|   |   |- lib                      : 3rd party libraries
|   |   |   |- angular              : AngularJS library
|   |   |   |- misc                 : html5shiv, respond.js
|   |   |- template                 : template files
|   |   |   |- account.html         : partial HTML file for account page
|   |   |   |- home.html            : partial HTML file for home page
|   |   |   |- login.html           : partial HTML file for login page
|   |   |   |- logout.html          : partial HTML file for logout page
|   |   |   |- nav.html             : partial HTML file for navigation
|   |   |- favicon.ico              : icon file for browser / bookmarks
|   |   |- index.html               : index HTML file for app layout
|- config                           : config files
|   |- app.json                     : default config file
|- logs                             : log files
|   |- app.log                      : default log file
|- scripts                          : script files for shell, cron, js, etc...
|   |- app.bat                      : default shell script for WIN platform
|   |- app.js                       : default shell script for Node.js
|   |- app.sh                       : default shell script for POSIX platforms
|- test                             : test files
|   |- test-all.js                  : default test file
|- template-CHANGELOG.md            : template changelog file
|- template-LICENSE.txt             : template license file
|- template-README.md               : template readme file
```

### Changelog

For all notable changes see [CHANGELOG.md](https://github.com/cmfatih/app-seed/blob/master/CHANGELOG.md)

### License

Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
For the full copyright and license information, please view the LICENSE.txt file.  
Licensed under The MIT License (MIT)

[npm-url]: http://npmjs.org/package/app-seed
[npm-image]: https://badge.fury.io/js/app-seed.png