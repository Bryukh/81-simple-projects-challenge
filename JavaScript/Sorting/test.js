var sort = require("./sort"),
    _ = require("underscore"),
    sortMethods = {bubble: sort.bubbleSort, merge: sort.mergeSort};

var testSet = function (sort){
    this.simple = function(test) {
        test.expect(2);
        test.deepEqual(sort([1, 3, 2]), [1, 2, 3], "123");
        test.deepEqual(sort([0, -2, -5, 2]), [-5, -2, 0, 2], "-+");
        test.done();
    };
    this.reverse = function (test) {
        test.expect(1);
        test.deepEqual(sort(_.range(100, -1, -1)), _.range(101), "100");
        test.done();
    };
    this.random = function(test) {
        test.expect(1);
        var array = [];
        for (var i = 0; i < 1000; i++) {
            array.push(_.random(1000));
        }
        test.deepEqual(sort(array.slice()), array.slice().sort(function(x, y) {return x - y;}), "random");
        test.done();
    };
};

for (var s in sortMethods) {
    if (!sortMethods.hasOwnProperty(s)) {continue;}
    var tests = new testSet(sortMethods[s]);
    exports[s + "-" + "simple"] = tests.simple;
    exports[s + "-" + "reverse"] = tests.reverse;
    exports[s + "-" + "random"] = tests.random;
}
