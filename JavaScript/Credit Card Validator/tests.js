"use strict";

const assert = require("assert");
const validator = require("./validator.js");

// Valid card numbers from various vendors
assert(validator.isValid("4111111111111111")); // Visa
assert(validator.isValid("5555555555554444")); // MasterCard
assert(validator.isValid("378282246310005"));  // AmEx
assert(validator.isValid("6011111111111117")); // Discover

// Invalid card numbers
assert(!validator.isValid("4111111111111112"));
assert(!validator.isValid("1234567890123456"));

// Vendor detection
assert.equal(validator.getVendor("4111111111111111"), "visa");
assert.equal(validator.getVendor("5555555555554444"), "mastercard");
assert.equal(validator.getVendor("378282246310005"), "amex");
assert.equal(validator.getVendor("6011111111111117"), "discover");
assert.equal(validator.getVendor("0000000000000000"), "");
