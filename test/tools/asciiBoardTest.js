var Game = require('../../src/index.js');
var asciiBoard = require('../../src/tools/asciiBoard.js');

exports.testAsciiGomokuBoard = function (test) {
    var game = new Game();
    game.moveTo('H8');
    game.moveTo('A1');
    game.moveTo('O15');
    var pos =
      '     A  B  C  D  E  F  G  H  I  J  K  L  M  N  O \n'
      + ' 15                                            x \n'
      + ' 14                                              \n'
      + ' 13                                              \n'
      + ' 12                                              \n'
      + ' 11                                              \n'
      + ' 10                                              \n'
      + ' 9                                               \n'
      + ' 8                        x                      \n'
      + ' 7                                               \n'
      + ' 6                                               \n'
      + ' 5                                               \n'
      + ' 4                                               \n'
      + ' 3                                               \n'
      + ' 2                                               \n'
      + ' 1   o                                           \n';

    test.equals(pos, asciiBoard(game.getPosition()));
    test.done();
};

exports.testAsciiTicTacToeBoard = function (test) {

    var game = new Game({
        strategy: 'ticTacToe'
    });
    game.moveTo('b2');
    game.moveTo('a1');
    game.moveTo('a3');
    var pos =
      '     A  B  C \n'
      + ' 3   x       \n'
      + ' 2      x    \n'
      + ' 1   o       \n';


    test.equals(pos, asciiBoard(game.getPosition()));
    test.equals(pos, game.ascii());
    test.done();
};
