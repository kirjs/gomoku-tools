var Mnk = require('./mnk');
var _ = require('lodash');

function TicTacToe(config) {
    this.config = _.defaults({}, config, this.defaults);
}

TicTacToe.prototype = new Mnk();

TicTacToe.prototype.defaults = {
    cellsX: 3,
    cellsY: 3,
    k: 3
};

module.exports = TicTacToe;