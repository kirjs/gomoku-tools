var Game = require('../src/index.js');
var utils = require('../src/tools/utils.js');
var game;

exports.setUp = function (done) {
    game = new Game({
        strategy: 'ticTacToe'
    });
    done();
};
var positions = {
    empty: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    firstCenter: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ]
};

exports.testAddingMoves = function (test) {
    test.deepEqual(game.getPosition(), positions.empty);

    game.moveTo([1, 1]);

    test.deepEqual(game.getPosition(), positions.firstCenter);


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
    game.moveTo('b2', 'a1', 'a3', 'c1', 'b1');
    test.deepEqual(game.getPosition(), [
        [1, 0, 0],
        [0, 1, 0],
        [2, 1, 2]
    ]);
    test.done();
};

exports.testMutatingPositionDoesNotAffectTheGame = function (test) {
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
    game.setPosition(position);
    test.deepEqual(position, game.getPosition());
    test.done();
};

exports.cloningAGame = function (test) {
    game.moveTo('b2', 'a1', 'a3', 'c1', 'b1');
    var cloned = game.clone();
    test.deepEqual(game.getPosition(), cloned.getPosition());
    test.done();
};


exports.testGoingBackwards = function (test) {
    game.moveTo('b2');
    game.moveTo('a1');

    test.deepEqual(game.getPosition(), [
        [0, 0, 0],
        [0, 1, 0],
        [2, 0, 0]
    ]);

    game.back();

    test.deepEqual(game.getPosition(), positions.firstCenter);
    game.back();

    test.deepEqual(game.getPosition(), positions.empty);

    game.back();

    test.deepEqual(game.getPosition(), positions.empty);

    test.done();
};

exports.testGoingForward = function (test) {
    game.moveTo('b2');
    game.moveTo('a1');
    game.back();
    game.back();
    game.back();
    game.forward();

    test.deepEqual(game.getPosition(), positions.firstCenter);

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
    game.moveTo('b2');
    game.moveTo('a1');
    game.moveTo('a2');

    test.deepEqual(game.getHistory(), ['B2', 'A1', 'A2']);
    test.done();
};

exports.testApplyingHistory = function (test) {
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
    game.moveTo('b2');
    test.ok(game.has('b2'));
    test.ok(!game.has('b1'));
    test.ok(game.has([1, 1]));
    test.ok(!game.has([0, 0]));
    test.done();
};

exports.testMovingToACellThatHasSomethingDoesNothing = function (test) {
    game.moveTo('b2');
    game.moveTo('b2');
    test.deepEqual(game.getPosition(), positions.firstCenter);
    test.done();
};


exports.testResetGame = function (test) {
    var game = new Game({
        strategy: 'ticTacToe'
    });
    game.moveTo('b2', 'a1', 'a3');
    game.reset();
    test.deepEqual(game.getPosition(), positions.empty);
    test.done();
};

exports.testPassingGameSequenceToConstructorAsAFirstArgument = function (test) {
    var game = new Game(['b2', 'a1', 'a3', 'c1', 'b1'], {
        strategy: 'ticTacToe'
    });
    test.deepEqual(game.getPosition(), [
        [1, 0, 0],
        [0, 1, 0],
        [2, 1, 2]
    ]);
    test.done();
};

exports.testPassingGameSequenceToConstructorAsAConfigurationParameter = function (test) {
    var game = new Game({
        moves: ['b2', 'a1', 'a3', 'c1', 'b1'],
        strategy: 'ticTacToe'
    });
    test.deepEqual(game.getPosition(), [
        [1, 0, 0],
        [0, 1, 0],
        [2, 1, 2]
    ]);
    test.done();
};
