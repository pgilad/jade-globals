# jade-globals

[![Build Status](http://img.shields.io/travis/pgilad/jade-globals.svg?style=flat)](https://travis-ci.org/pgilad/jade-globals)

> Detect which global variables are used in your jade templates

Given:
```jade
.some-class(title=externalTitle)
    table#crazy-table(class=externalClass)
        if showHeader
            thead
```

Using `jade-globals` will output:

`['externalTitle', 'externalClass', 'showHeader']`

It's a tool meant to map your required dependencies in your jade files.

## Install

```bash
# install as a dev dependency
$ npm install --save-dev jade-globals

# install globally for use as cli
$ npm install --global jade-globals
```

## Usage

```js
var fs = require('fs');
var jadeGlobals = require('jade-globals');

var contents = fs.readFileSync('crazy-template.jade', 'utf8');
console.log(jadeGlobals(contents));
// => ['global1', 'global2']
```

Usage as a cli:

```bash
❯ jade-globals --help

  Usage: jade-globals [options] <file>

  Detect which global variables are used in your jade templates

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -s, --show-jade-global   Show the jade global as well
    -i, --ignore <keywords>  Ignore keyword (default: [])

  Examples:

    $ jade-globals template.jade
    $ jade-globals --ignore someGlobal template.jade
    $ cat template.jade | jade-globals
```

## Options

### jadeGlobals(contents, params)

#### contents

`String` the contents of the jade file to parse.

**Required**

#### params

`Object` optional params and their defaults:
```js
{
    // the `jade` global is hidden by default. Set to true to include it.
    showJadeGlobal: false
    // optional ignore list
    ignore: []
}
```

## License

MIT © [Gilad Peleg](http://giladpeleg.com)
