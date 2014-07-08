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

    game.moveTo([1, 1]);

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

exports.testSetPosition = function (test) {
    var position = (new Game({strategy: 'ticTacToe'})).moveTo('b2', 'a1', 'a3', 'c1', 'b1').getPosition();
    var game = new Game({
        strategy: 'ticTacToe'
    });
    game.setPosition(position);
    test.deepEqual(position, game.getPosition());
    test.done();
};

exports.cloningAGame = function (test) {
    var game = new Game({
        strategy: 'ticTacToe'
    });
    game.moveTo('b2', 'a1', 'a3', 'c1', 'b1');
    var cloned = game.clone();
    test.deepEqual(game.getPosition(), cloned.getPosition());
    test.done();
};


exports.testGoingBackwards = function (test) {
    var game = new Game({
        strategy: 'ticTacToe'
    });
    game.moveTo('b2');
    game.moveTo('a1');

    test.deepEqual(game.getPosition(), [
        [0, 0, 0],
        [0, 1, 0],
        [2, 0, 0]
    ]);

    game.back();

    test.deepEqual(game.getPosition(), [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ]);
    game.back();

    test.deepEqual(game.getPosition(), [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]);

    game.back();

    test.deepEqual(game.getPosition(), [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]);

    test.done();
};

exports.testGoingForward = function (test) {
    var game = new Game({
        strategy: 'ticTacToe'
    });
    game.moveTo('b2');
    game.moveTo('a1');
    game.back();
    game.back();
    game.back();
    game.forward();

    test.deepEqual(game.getPosition(), [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ]);

    game.forward();

    test.deepEqual(game.getPosition(), [
        [0, 0, 0],
        [0, 1, 0],
        [2, 0, 0]
    ]);
    game.forward();

    test.deepEqual(game.getPosition(), [
        [0, 0, 0],
        [0, 1, 0],
        [2, 0, 0]
    ]);

    test.done();
};

exports.testMakingAMoveShouldClearUndoHistory = function (test) {
    var game = new Game({
        strategy: 'ticTacToe'
    });
    game.moveTo('b2');
    game.moveTo('a1');
    game.back();
    game.moveTo('a2');
    game.forward();
    test.deepEqual(game.getPosition(), [
        [0, 0, 0],
        [2, 1, 0],
        [0, 0, 0]
    ]);

    test.done();
};
exports.testMakingAMoveShouldClearUndoHistory = function (test) {
    var game = new Game({
        strategy: 'ticTacToe'
    });
    game.moveTo('b2');
    game.moveTo('a1');
    game.back();
    game.moveTo('a2');
    game.forward();
    test.deepEqual(game.getPosition(), [
        [0, 0, 0],
        [2, 1, 0],
        [0, 0, 0]
    ]);

    test.done();
};


exports.testGetHistory = function (test) {
    var game = new Game({
        strategy: 'ticTacToe'
    });
    game.moveTo('b2');
    game.moveTo('a1');
    game.moveTo('a2');

    test.deepEqual(game.getHistory(), ['B2', 'A1', 'A2']);
    test.done();
};

exports.testApplyingHistory = function (test) {
    var game = new Game({
        strategy: 'ticTacToe'
    });
    var game2 = new Game({
        strategy: 'ticTacToe'
    });
    game.moveTo('b2');
    game.moveTo('a1');
    game.moveTo('a2');

    var position = game.getPosition();

    game2.moveTo.apply(game2, game.getHistory());
    test.deepEqual(game2.getPosition(), position);
    test.done();
};


exports.testHas = function (test) {
    var game = new Game({
        strategy: 'ticTacToe'
    });

    game.moveTo('b2');
    test.ok(game.has('b2'));
    test.ok(!game.has('b1'));
    test.ok(game.has([1, 1]));
    test.ok(!game.has([0, 0]));
    test.done();
};



