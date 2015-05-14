#!/usr/bin/env node

'use strict';
var program = require('commander');
var stdin = require('get-stdin');
var fs = require('fs');

process.title = 'jade-globals';
var jadeGlobals = require('../index');
var pkg = require('../package.json');

function list(val) {
    return val.split(',');
}

program
    .description(pkg.description)
    .version(pkg.version)
    .usage('[options] <file>')
    .option('-j, --json', 'Output as JSON')
    .option('-s, --show-jade-global', 'Show the jade global as well')
    .option('-i, --ignore <keywords>', 'Ignore keyword (default: [])', list)
    .on('--help', function () {
        console.log('  Examples:');
        console.log('');
        console.log('    $ jade-globals template.jade');
        console.log('    $ jade-globas --json template.jade');
        console.log('    $ cat template.jade | jade-globals');
        console.log('');
    })
    .parse(process.argv);

function run(contents, file) {
    var params = {
        showJadeGlobal: program.showJadeGlobal,
        ignore: program.ignore,
        filename: file
    };
    var output = jadeGlobals(contents, params);
    if (!program.json) {
        output = JSON.stringify(output);
    }
    console.log(output);
    process.exit(0);
}

if (!process.stdin.isTTY) {
    return stdin(function (contents) {
        run(contents);
    });
}

if (!program.args.length) {
    program.help();
    return;
}

var file = program.args[0];
if (!file) {
    console.log('A file is required');
    process.exit(1);
}
var contents = fs.readFileSync(file, 'utf8');
run(contents, file);
