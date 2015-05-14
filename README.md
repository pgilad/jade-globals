# jade-globals

> Detect what global variables are used in your jade templates

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

```js
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
