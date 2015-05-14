'use strict';

var jade = require('jade');
var acornGlobals = require('acorn-globals');
var without = require('lodash.without');
var uniq = require('lodash.uniq');
var defaults = require('lodash.defaults');

var defaultParams = {
    showJadeGlobal: false,
    ignore: []
};

module.exports = function getJadeGlobals(contents, params) {
    var options = defaults(params || {}, defaultParams);
    if (!contents) {
        throw new Error('Missing contents');
    }
    var compiled;
    compiled = jade.compileClient(contents, {
        filename: options.filename,
        compileDebug: false,
        debug: false
    });

    var scope = acornGlobals(compiled);

    var globals = scope.map(function (item) {
        return item.name;
    });

    var ignore = options.ignore.slice() || [];
    if (!options.showJadeGlobal) {
        ignore.push('jade');
    }

    ignore = uniq(ignore);
    if (ignore.length) {
        globals = without.apply(without, [globals].concat(ignore));
    }
    return globals;
};
