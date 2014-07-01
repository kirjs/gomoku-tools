var Gomoku = require('../../src/strategies/gomoku');

exports.testConversion = function (test) {
    var gomoku = new Gomoku({});
    test.deepEqual(gomoku.fromXY('h8'), [7, 7]);
    test.deepEqual(gomoku.fromXY('h1'), [14, 7]);
    test.done();

};
