## App Seed

[app-seed](http://github.com/cmfatih/app-seed) is an application skeleton for web apps.
It uses [AngularJS](http://angularjs.org/) for front-end and [Node.js](http://nodejs.org/) 
(with [hapi](http://hapijs.com/)) for back-end. It is suitable for Single Page Application (SPA) 
and provides user authentication with [Google OAuth 2.0](https://developers.google.com/accounts/docs/OAuth2WebServer)

app-seed on [npm registry](http://npmjs.org/package/app-seed)

### Installation

For latest release
```
npm install app-seed
```

For HEAD
```
git clone https://github.com/cmfatih/app-seed.git
cd app-seed/
npm install
```

Permissions
```
find ../app-seed/ -type f -exec chmod 644 {} +
find ../app-seed/ -type d -exec chmod 755 {} +
chmod 775 ../app-seed/logs/
chmod 664 ../app-seed/logs/app.log
chmod 755 ../app-seed/scripts/app.sh
chmod 755 ../app-seed/scripts/app.js
```

#### Config

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

### Usage

#### Test
```
npm test
```

#### Starting server
```
node ./services/httpd/index.js -c config/test.json
```

Go to [http://localhost:12080/](http://localhost:12080/)

### Notes

* For issues see [Issues](https://github.com/cmfatih/app-seed/issues)
* For coding and design goals see [CODING.md](https://github.com/cmfatih/app-seed/blob/master/CODING.md)

### Changelog

For all notable changes see [CHANGELOG.md](https://github.com/cmfatih/app-seed/blob/master/CHANGELOG.md)

### License

Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
For the full copyright and license information, please view the LICENSE.txt file.  
Licensed under The MIT License (MIT)
