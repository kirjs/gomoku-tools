var Game = require('../../src/index.js');
var game;

exports.setUp = function (done) {
    game = new Game({
        strategy: 'ticTacToe'
    });
    done();
};

exports.testResettingPositionKeepsTheBinding = function (test) {
    var position = game.position;
    test.equals(position[1][1], 0);
    game.moveTo('b2');
    test.equals(position[1][1], 1);
    game.reset();
    test.equals(position[1][1], 0);
    test.done();
};
