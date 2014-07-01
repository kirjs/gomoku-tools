var Game = require('../src/index.js').Game;
var moves = ["h8", "g7", "j8", "g9", "g8", "f8", "h10", "e9", "h6", "d10", "c11", "f9", "h9"];

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
