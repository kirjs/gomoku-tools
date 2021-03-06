var Game = require('../../src/index.js');
var transform = require('../../src/tools/transforms');

exports.setUp = function (done) {
    this.game = new Game({
        strategy: 'ticTacToe'
    });
    this.game.moveTo('b2', 'a1', 'a3', 'c1', 'b1');
    done();
};
exports.testRotateHorizontal = function (test) {
    var original = [
        [0, 0, 1],
        [0, 1, 0],
        [2, 1, 2]
    ];
    test.deepEqual(transform.horizontal(this.game.getPosition()), original);
    test.done();
};
exports.testRotateHorizontalDoesNotMutateTheOriginal = function (test) {
    var position = this.game.getPosition();
    var original = this.game.getPosition();
    transform.horizontal(position);
    test.deepEqual(position, original);
    test.done();
};

exports.testRotateVertical = function (test) {
    test.deepEqual(transform.vertical(this.game.getPosition()), [
        [2, 1, 2],
        [0, 1, 0],
        [1, 0, 0]
    ]);
    test.done();
};

exports.testRotateClockwise = {
    testRotateSquarePosition: function (test) {
        test.deepEqual(transform.clockwise(this.game.getPosition()), [
            [2, 0, 1],
            [1, 1, 0],
            [2, 0, 0]
        ]);
        test.done();
    },
    testRotateRectangle2x3: function (test) {
        test.deepEqual(transform.clockwise([
            [1, 2, 3],
            [4, 5, 6]
        ]), [
            [4, 1],
            [5, 2],
            [6, 3]
        ]);
        test.done();
    },
    testRotateRectangle3x2: function (test) {
        test.deepEqual(transform.clockwise([
            [1, 2],
            [3, 4],
            [5, 6]
        ]), [
            [5, 3, 1],
            [6, 4, 2]
        ]);
        test.done();
    }
};

exports.testRotateCounterClockwise = function (test) {
    test.deepEqual(transform.counterClockwise(this.game.getPosition()), [
        [0, 0, 2],
        [0, 1, 1],
        [1, 0, 2]
    ]);
    test.done();
};
exports.testTwiceClockwisIsTheSameTwiceCounterClockwise = function (test) {
    var clockwise = transform.clockwise(transform.clockwise(this.game.getPosition()));
    var counterclockwise = transform.counterClockwise(transform.counterClockwise(this.game.getPosition()));
    test.deepEqual(clockwise, counterclockwise);
    test.done();
};

exports.testDiagonalFromLeftTopToRightBottom = function (test) {
    test.deepEqual(transform.diagonalFromLeftTopToRightBottom(this.game.getPosition()), [
        [2, 0, 0],
        [1, 1, 0],
        [2, 0, 1]
    ]);
    test.done();
};

exports.testDiagonalFromRightTopToLeftBottom = function (test) {
    test.deepEqual(transform.diagonalFromRightTopToLeftBottom(this.game.getPosition()), [
        [1, 0, 2],
        [0, 1, 1],
        [0, 0, 2]
    ]);
    test.done();
};

exports.testClockwise45 = function (test) {
    test.deepEqual(transform.clockwise45(this.game.getPosition()), [
        [ 0, 0, 1, 0, 0 ],
        [ 0, 0, 1, 0, 0 ],
        [ 2, 1, 2, 0, 0 ]
    ]);
    test.done();
};
exports.testCounterClockwise45 = function (test) {
    test.deepEqual(transform.counterClockwise45(this.game.getPosition()), [
        [ 1, 0, 0, 0, 0 ],
        [ 0, 0, 1, 0, 0 ],
        [ 0, 0, 2, 1, 2 ]
    ]);
    test.done();
};
