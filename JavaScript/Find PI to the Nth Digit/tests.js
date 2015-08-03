"use strict";

var assert = require("assert");
var pi = require("./Pi.js");

assert.equal(pi.findPi(2), "3.14");
assert.equal(pi.findPi(0), "3");
assert.equal(pi.findPi(10), "3.1415926535");
