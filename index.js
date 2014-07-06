var Game = require('./src/index.js');

global.gomokuTools = module.exports = {
    Gomoku: function (config) {
        config = config || {};
        config.strategy = 'gomoku';
        return new Game(config);
    },
    TicTacToe: function (config) {
        config = config || {};
        config.strategy = 'ticTacToe';
        return new Game(config);
    },
    Renju: function (config) {
        config = config || {};
        config.strategy = 'renju';
        return new Game(config);
    }
};
