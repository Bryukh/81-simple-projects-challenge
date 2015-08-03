#!/usr/bin/env node

// Enter a number and have the program generate
// the Fibonacci sequence to that number or to the Nth number.

"use strict";

function main() {
    var readline = require('readline'),
        rl = readline.createInterface(process.stdin, process.stdout),
        N, answer;

    console.log("Enter a number of the sequence length:");
    rl.on('line', function (cmd) {
        answer = fibonacci(parseInt(cmd));
        console.log("Fibonacci Sequence = ", answer.join(","));
        process.exit(0);
    });
}

function fibonacci(n) {
    var a = 1,
        b = 1,
        result = [a, b],
        buffer;
    for (var i = 0; i < n - 2; i++) {
        buffer = b;
        b = a + b;
        a = buffer;
        result.push(b);
    }
    return result;
}

if (require.main === module) {
    main();
}