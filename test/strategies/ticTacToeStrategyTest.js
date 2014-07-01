var TicTacToe = require('../../src/strategies/ticTacToe');

exports.testConversion = function (test) {
    var ticTacToe = new TicTacToe({});
    test.deepEqual(ticTacToe.fromXY('B2'), [1, 1]);
    test.deepEqual(ticTacToe.fromXY('A1'), [2, 0]);
    test.deepEqual(ticTacToe.fromXY('A2'), [1, 0]);
    test.done();
};
