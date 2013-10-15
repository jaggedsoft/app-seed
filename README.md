## App Seed

  [app-seed](http://github.com/cmfatih/app-seed) is an application skeleton for web apps.  

### Installation

```
git clone https://github.com/cmfatih/app-seed.git
```

#### Permissions

```
sudo find . -type f -exec chmod 644 {} +
sudo find . -type d -exec chmod 755 {} +
sudo chmod 775 logs/
sudo chmod 664 logs/app.log
sudo chmod 755 scripts/app.sh
```

### File Structure

```
|- app
|   |- css
|   |   |- app.css
|   |- img
|   |   |- favicon.ico
|   |- js
|   |   |- app.js
|   |- lib
|   |   |- angular
|   |   |- bootstrap
|   |   |- jquery
|   |   |- misc
|   |       |- html5shiv.js
|   |       |- respond.js
|   |- template
|   |   |- home.html
|   |- favicon.ico
|   |- index.html
|- config
|   |- app.json
|- logs
|   |- app.log
|- scripts
|   |- app.bat
|   |- app.sh
|- test
|- .gitattributes
|- .gitignore
|- .jshintrc
|- .npmignore
|- LICENSE.txt
|- README.md
```

### License

Copyright (c) 2013 Fatih Cetinkaya (http://github.com/cmfatih/app-seed)  
Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.