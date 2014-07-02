var utils = require('../../src/tools/utils');

exports.testClone = function (test) {
    var position = [
        [0, 0, 1],
        [0, 1, 0],
        [2, 1, 2]
    ];
    var original = [
        [0, 0, 1],
        [0, 1, 0],
        [2, 1, 2]
    ];
    var clone = utils.clonePosition(position);
    clone[0][0] = 5;
    clone[0][2] = 5;
    clone[1][0] = 5;
    clone[2][2] = 5;
    clone[2][1] = 5;


    test.deepEqual(original, position);
    test.done();
};

exports.testStringify = function (test) {
    test.equals('001010212', utils.stringify([
        [0, 0, 1],
        [0, 1, 0],
        [2, 1, 2]
    ]));
    return test.done();
};
