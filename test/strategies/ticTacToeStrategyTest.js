var TicTacToe = require('../../src/strategies/ticTacToe');

exports.testFromXY = function (test) {
    var ticTacToe = new TicTacToe({});
    test.deepEqual(ticTacToe.toPoint('B2'), [1, 1]);
    test.deepEqual(ticTacToe.toPoint('A1'), [2, 0]);
    test.deepEqual(ticTacToe.toPoint('A2'), [1, 0]);
    test.done();
};

exports.testToXY = function (test) {
    var ticTacToe = new TicTacToe({});
    test.deepEqual(ticTacToe.toXY([1, 1]), 'B2');
    test.deepEqual(ticTacToe.toXY([2, 0]), 'A1');
    test.deepEqual(ticTacToe.toXY([1, 0]), 'A2');
    test.done();
};
