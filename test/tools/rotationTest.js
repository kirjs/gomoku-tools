var Game = require('../../src/index.js').Game;
var rotate = require('../../src/tools/rotate');
exports.setUp = function (done) {
    this.game = new Game({
        strategy: 'ticTacToe'
    });
    this.game.moveTo('b2', 'a1', 'a3', 'c1', 'b1');
    done();
};
exports.testRotateHorizontal = function (test) {
    test.deepEqual(rotate.horizontal(this.game.getPosition()), [
        [0, 0, 1],
        [0, 1, 0],
        [2, 1, 2]
    ]);
    test.done();

};

exports.testRotateVertical = function (test) {
    test.deepEqual(rotate.vertical(this.game.getPosition()), [
        [2, 1, 2],
        [0, 1, 0],
        [1, 0, 0]
    ]);
    test.done();
};

exports.testRotateClockwise = function (test) {
    test.deepEqual(rotate.clockwise(this.game.getPosition()), [
        [2, 0, 1],
        [1, 1, 0],
        [2, 0, 0]
    ]);
    test.done();
};

exports.testRotateCounterClockwise = function (test) {
    test.deepEqual(rotate.counterclockwise(this.game.getPosition()), [
        [0, 0, 2],
        [0, 1, 1],
        [1, 0, 2]
    ]);
    test.done();
};
exports.testTwiceClockwisIsTheSameTwiceCounterClockwise = function (test) {
    var clockwise = rotate.clockwise(rotate.clockwise(this.game.getPosition()));
    var counterclockwise = rotate.counterclockwise(rotate.counterclockwise(this.game.getPosition()));
    test.deepEqual(clockwise, counterclockwise);
    test.done();
};

exports.testDiagonalFromLeftTopToRightBottom = function (test) {
    test.deepEqual(rotate.diagonalFromLeftTopToRightBottom(this.game.getPosition()), [
        [2, 0, 0],
        [1, 1, 0],
        [2, 0, 1]
    ]);
    test.done();
};

exports.testDiagonalFromRightTopToLeftBottom = function (test) {
    test.deepEqual(rotate.diagonalFromRightTopToLeftBottom(this.game.getPosition()), [
        [1, 0, 2],
        [0, 1, 1],
        [0, 0, 2]
    ]);
    test.done();
};
