/* global describe,it */
'use strict';
var expect = require('expect.js');

var jadeGlobals = require('../index');
var fs = require('fs');
var path = require('path');

function read(file) {
    return fs.readFileSync(path.join(__dirname, 'fixtures', file), 'utf8');
}

describe('jade-globals', function () {
    describe('logic', function () {
        it('should test a simple jade file', function () {
            expect(jadeGlobals(read('simple.jade'))).to.eql(['title']);
        });

        it('should test a advanced jade file', function () {
            expect(jadeGlobals(read('advanced.jade'))).to.eql(['jmxLink', 'plugins']);
        });

        it('should work with a jade file with no globals', function () {
            expect(jadeGlobals(read('empty.jade'))).to.eql([]);
        });
    });

    describe('options', function() {
        it('should work with non-sorting');
        it('should with ignores');
        it('should not remove jade global if specified');
    });
});
