var Mnk = require('./mnk');
var _defaults = require('lodash.defaults');

function TicTacToe(config) {
    this.config = _defaults({}, config, this.defaults);
}

TicTacToe.prototype = new Mnk();

TicTacToe.prototype.defaults = {
    cellsX: 3,
    cellsY: 3,
    k: 3
};

module.exports = TicTacToe;
