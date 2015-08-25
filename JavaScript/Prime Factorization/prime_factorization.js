"use strict";

/*jslint node: true */

function primeFactors(n, acc) {
    acc = acc || [];
    if (n < 2) return acc;
    var root = Math.sqrt(n),
        d = 2;

    if (n % d) {
        for (d = 3; d < root; d += 2) {
            if (!(n % d)) {
                break;
            }
        }
    }
    d = (d > root) ? n : d;
    acc.push(d);
    return primeFactors(n / d, acc);
}

function main() {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Please enter a number for a factorization:\n", function(str){
        console.log(primeFactors(Number(str)));
        rl.close();
        process.stdin.destroy();
    })
}

module.exports = primeFactors;

if (require.main === module) {
    main();
}