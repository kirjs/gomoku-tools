var Game = require('../src/index.js');
var utils = require('../src/tools/utils.js');

exports.testAddingMoves = function (test) {
    var game = new Game({
        strategy: 'ticTacToe'
    });

    test.deepEqual(game.getPosition(), [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]);

    game.moveTo('b2');

    test.deepEqual(game.getPosition(), [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ]);


    game.moveTo('a1');

    test.deepEqual(game.getPosition(), [
        [0, 0, 0],
        [0, 1, 0],
        [2, 0, 0]
    ]);

    game.moveTo('a3');

    test.deepEqual(game.getPosition(), [
        [1, 0, 0],
        [0, 1, 0],
        [2, 0, 0]
    ]);


    game.moveTo('c1');

    test.deepEqual(game.getPosition(), [
        [1, 0, 0],
        [0, 1, 0],
        [2, 0, 2]
    ]);
    game.moveTo('b1');

    test.deepEqual(game.getPosition(), [
        [1, 0, 0],
        [0, 1, 0],
        [2, 1, 2]
    ]);

    test.done();

};

exports.testAddingMultipleMoves = function (test) {
    var game = new Game({
        strategy: 'ticTacToe'
    });
    game.moveTo('b2', 'a1', 'a3', 'c1', 'b1');
    test.deepEqual(game.getPosition(), [
        [1, 0, 0],
        [0, 1, 0],
        [2, 1, 2]
    ]);
    test.done();
};

exports.testMutatingPositionDoesNotAffectTheGame = function (test) {
    var game = new Game({
        strategy: 'ticTacToe'
    });
    game.moveTo('b2', 'a1', 'a3', 'c1', 'b1');
    var original = utils.clonePosition(game.getPosition());
    var position = game.getPosition();
    position[0][0] = 9;
    position[0][1] = 9;
    position[2][0] = 9;
    position[1][2] = 9;
    test.deepEqual(original, game.getPosition());
    test.done();

};
