var normalize = require('../../src/tools/normalize.js');
var transforms = require('../../src/tools/transforms.js');
var Game = require('../../src/index.js').Game;

exports.testBasic = function (test) {
    this.game = new Game({
        strategy: 'ticTacToe'
    });
    this.game.moveTo('b2', 'a1', 'a3', 'c1', 'b1');
    var position = this.game.getPosition();
    var normalized = normalize.basic(position);
    test.deepEqual(normalized, normalize.basic(transforms.vertical(position)));
    test.deepEqual(normalized, normalize.basic(transforms.horizontal(position)));
    test.deepEqual(normalized, normalize.basic(transforms.clockwise(position)));
    test.deepEqual(normalized, normalize.basic(transforms.clockwise(transforms.clockwise(position))));
    test.deepEqual(normalized, normalize.basic(transforms.counterClockwise(position)));
    test.deepEqual(normalized, normalize.basic(transforms.diagonalFromLeftTopToRightBottom(position)));
    test.deepEqual(normalized, normalize.basic(transforms.diagonalFromRightTopToLeftBottom(position)));

    test.done();

};

