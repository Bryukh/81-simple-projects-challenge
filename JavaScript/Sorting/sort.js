var _ = require("underscore");

function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function bubbleSort(array) {
    array = array.slice();
    for (var i = array.length - 1; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
            }
        }
    }
    return array;
}

function merge(ar1, ar2) {
    var i = 0,
        j = 0,
        l1 = ar1.length,
        l2 = ar2.length,
        res = [];
    while ((i < l1) || (j < l2)) {
        if (i >= l1 || (j < l2 && ar1[i] > ar2[j])) {
            res.push(ar2[j++]);
        }
        else {
            res.push(ar1[i++]);
        }
    }
    return res;
}

function mergeSort(array, start, end, level) {
    start = start === undefined ? 0 : start;
    end = end === undefined ? array.length - 1 : end;
    level = level || 1;
    if (start === end) {return [array[start]];}
    var middle = parseInt((start + end) / 2);
    return merge(mergeSort(array, start, middle, level + 1), mergeSort(array, middle + 1, end, level + 1));
}

exports.bubbleSort = bubbleSort;
exports.mergeSort = mergeSort;
