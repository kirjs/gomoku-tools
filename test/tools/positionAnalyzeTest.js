var analyze = require('../../src/tools/positionAnalyze.js');
var Game = require('../../src/index.js');


function testMoves(moves) {
    var game = new Game(moves.split(','));
    var position = game.getPosition();
    return analyze.isFinished(position);

}
exports.testIsFinished = {
    testNotFinished: function (test) {
        test.ok(!testMoves('H8,I9,I8,G8,H7,H6,J7,K7,J5,G9,H9,G10,G7,G11,G12,H10,J8,F10,I10,F12,E13,F11,F9,E11,D11,D10,G13'));
        test.done();
    },
    test5HorizontalWhite: function (test) {
        test.ok(testMoves('H8,I9,I8,G8,H7,H6,J7,K7,J5,G9,H9,G10,G7,G11,G12,H10,J8,F10,I10,F12,E13,F11,F9,E11,D11,D10,G13,E10'));
        test.done();
    },
    test5HorizontalBlack: function (test) {
        test.ok(testMoves('H8,I9,I8,G8,H7,H6,J7,K7,J5,G9,H9,G10,G7,G11,G12,H10,J8,F10,I10,F12,E13,F11,F9,E11,D11,D10,G13,H11,I7,E7,F7'));
        test.done();
    },
    test5VerticalBlack: function (test) {
        test.ok(testMoves('H8,I9,I8,G8,H7,H6,J7,K7,J5,G9,H9,G10,G7,G11,G12,H10,J8,F10,I10,F12,E13,F11,F9,E11,D11,D10,G13,H11,I7,E7,J6,F7,J9'));
        test.done();
    },
    test5DiagonalTopRightToBottomLeftWhite: function (test) {
        test.ok(testMoves('H8,I9,I8,G8,H7,H6,J7,K7,J5,G9,H9,G10,G7,G11,G12,H10,J8,F10,I10,F12,E13,F11,F9,E11,D11,D10,G13,H11,I7,C9,D9,B8'));
        test.done();
    },
    test5DiagonalTopRightToBottomLeftBlack: function (test) {
        test.ok(testMoves('H8,I9,I8,G8,G7,F8,F6,E7,E5,H10,D4'));
        test.done();
    },

    test4DiagonalTopRightToBottomLeftBlack: function (test) {
        test.ok(!testMoves('H8,I9,I8,G8,G7,F8,F6,E7,E5,H10'));
        test.done();
    },
    test5DiagonalTopLeftToBottomRightWhite: function (test) {
        test.ok(testMoves('H8,I9,I8,G8,G7,F8,H7,F6,H6,H9,H5,H4,I7,J8,J7,K7,G9,L6,K5,M5'));
        test.done();
    },
    test5DiagonalTopLeftToBottomRightBlack: function (test) {
        test.ok(testMoves('H8,I9,I8,G8,G7,F8,H7,F6,H6,H9,H5,H4,I7,J8,J7,K7,G9,L6,K5,F10,J6'));
        test.done();
    }
};


