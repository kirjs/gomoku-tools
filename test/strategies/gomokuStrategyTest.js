var Gomoku = require('../../src/strategies/gomoku');

exports.testFromXY = function (test) {
    var gomoku = new Gomoku({});
    test.deepEqual(gomoku.fromXY('h8'), [7, 7]);
    test.deepEqual(gomoku.fromXY('h1'), [14, 7]);
    test.done();
};
exports.testToXY = function (test) {
    var gomoku = new Gomoku({});
    test.deepEqual(gomoku.toXY([7, 7]), 'H8');
    test.deepEqual(gomoku.toXY([14, 7]), 'H1');
    test.done();
};
