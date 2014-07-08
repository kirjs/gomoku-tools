var Gomoku = require('../../src/strategies/gomoku');
var gomoku;

exports.setUp = function (done) {
    gomoku = new Gomoku({});
    done();
};

exports.testFromXY = function (test) {
    test.deepEqual(gomoku.toPoint('h8'), [7, 7]);
    test.deepEqual(gomoku.toPoint('h1'), [14, 7]);
    test.done();
};
exports.testFromXYKeepsArrayAsIs = function (test) {
    test.deepEqual(gomoku.toPoint([7, 7]), [7, 7]);
    test.done();
};

exports.testToXY = function (test) {
    test.deepEqual(gomoku.toXY([7, 7]), 'H8');
    test.deepEqual(gomoku.toXY([14, 7]), 'H1');
    test.done();
};
exports.testToXYKeepsStringAsIs = function (test) {
    test.deepEqual(gomoku.toXY('H8'), 'H8');
    test.done();
};
