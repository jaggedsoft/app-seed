## App Seed

  [app-seed](http://github.com/cmfatih/app-seed) is an application skeleton for web apps.  

  **!!! APP-SEED IS STILL UNDER HEAVY DEVELOPMENT !!!**  

### Installation

```
git clone https://github.com/cmfatih/app-seed.git
```

### Usage

### Notes

#### App, design and coding goals

  * Use JavaScript
  * Use Node.js
  * Make it standalone.
  * Choose best community supported framework, lib, etc. if necessary.
  * Stay away from dependency for fundamental features.
  * Keep It Simple, Stupid (KISS)
  * Do One Thing, and do it well (DOT)
  * Don't Repeat Yourself (DRY)
  * Don't Make It Complicated, for a little benefit. (DMIC)

#### Permissions

```
sudo find . -type f -exec chmod 644 {} +
sudo find . -type d -exec chmod 755 {} +
sudo chmod 775 logs/
sudo chmod 664 logs/app.log
sudo chmod 755 scripts/app.sh
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
|   |- app.sh                 : default shell script for POSIX platforms
|- test                       : test files
|- .gitattributes             : attributes for GIT
|- .gitignore                 : ignore settings for GIT
|- .jshintrc                  : config for JSHint
|- .npmignore                 : ignore settings for NPM
|- LICENSE.txt                : license file
|- README.md                  : readme file
```

### Changelog

  * 20131020
    * README file
    * Default config files.

  * 20131014 
    * AngularJS 1.2.0-rc.2, Bootstrap 3.0.0 and jQuery 1.10.2, html5shiv, respond
    * README and LICENSE files

### License

Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.