var analyze = require('../../src/tools/positionAnalyze.js');
var Game = require('../../src/index.js');

exports.testBasic = function (test) {
    var moves = 'H8,I9,I8,G8,H7,H6,J7,K7,J5,G9,H9,G10,G7,G11,G12,H10,J8,F10,I10,F12,E13,F11,F9,E11,D11,D10,G13'.split(',');
    var game = new Game(moves);
    var position = game.getPosition();
    test.ok( !analyze.isFinished(position));
    test.done();
};

