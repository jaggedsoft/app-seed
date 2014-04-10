## Coding

### Design Goals

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

### Code

* For naming convention; camelCase capitalization used
* For file naming; words separated by `-` instead of `_`
* For closures; named function expressions used due benefits such as recursion.
* Variables (including closures) defined first due hoisting.
* "m" prefix used for module variables.
* "g" prefix used for global variables.
* "t" prefix used for temp (has generic name) variables.
* "i" prefix used for function (global) arguments.
* "p" prefix used for parameter variables.
* to string:
  - `('' + var)`
  - `.toString()`
* is array:
  - `(var instanceof Array)`
  - `(Object.prototype.toString.call(var) === '[object Array]')`
* is object:
  - `(typeof var === 'object')`
* is function:
  - `(typeof var === 'function')`
* check callback
  - `if(typeof iCB !== 'function') { var iCB = function(err) { return err; }; }`