#!/usr/bin/env node

// Find PI to the Nth Digit
// – Enter a number (or write as an argument) and
//   have the program generate PI up to that many decimal places.
//   Keep a limit to how far the program will go.
//
// @syntax:
// Pi.js
// or
// Pi.js N
//
// If N is not given, then user input.
//
// @params
// N - a number of decimal places in PI.

"use strict";

function main() {
    var readline = require('readline'),
        rl = readline.createInterface(process.stdin, process.stdout),
        N, Pi;

    if (process.argv[2]) {
        N = parseInt(process.argv[2], 10);
        Pi = findPi(parseInt(N));
    }
    else {
        console.log("Enter a number of decimal places for PI:");
        rl.on('line', function (cmd) {
            Pi = findPi(parseInt(cmd));
            process.exit(0);
        });
    }
    console.log("Pi = ", Pi);
}


function findPi(digits) {
    if (isNaN(digits) || parseInt(digits, 10) !== digits || digits < 0) {
        throw new TypeError("N should be integer");
    }
    if (digits === 0) {
        return "3";
    }
    var result = [],
        q = 1,
        r = 0,
        t = 1,
        k = 1,
        n = 3,
        l = 3,
        nr, nn,
        step = 0;
    while (step <= digits) {
        if (4 * q + r - t < n * t) {
            result.push(n);
            nr = 10 * (r - n * t);
            n = Math.floor((10 * (3 * q + r)) / t) - 10 * n;
            q *= 10;
            r = nr;
            step++;
        }
        else {
            nr = (2 * q + r) * l;
            nn = Math.floor((q * (7 * k) + 2 + (r * l)) / (t * l));
            q *= k;
            t *= l;
            l += 2;
            k += 1;
            n = nn;
            r = nr;
        }
    }
    return "3." + result.slice(1).join("");
}

exports.findPi = findPi;

if (require.main === module) {
    main();
}
