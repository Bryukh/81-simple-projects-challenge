var primeFactors = require("./prime_factorization");

exports.testSimple = function(test) {
    test.expect(3);
    test.deepEqual(primeFactors(6), [2, 3], "6");
    test.deepEqual(primeFactors(7), [7], "7");
    test.deepEqual(primeFactors(16), [2, 2, 2, 2], "16");
    test.done();
};

exports.testEmpty = function (test) {
    test.expect(3);
    test.deepEqual(primeFactors(1), [], "1");
    test.deepEqual(primeFactors(1), [], "0");
    test.deepEqual(primeFactors(1), [], "-2");
    test.done();
}

exports.testPrime = function (test) {
    test.expect(3);
    test.deepEqual(primeFactors(7919), [7919], "7919");
    test.deepEqual(primeFactors(104729), [104729], "104729");
    test.deepEqual(primeFactors(2), [2], "2");
    test.done();
}
