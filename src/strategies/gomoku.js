var Mnk = require('./mnk');
var _defaults = require('lodash.defaults');

function Gomoku(config) {
    this.config = _defaults({}, config, this.defaults);

}
Gomoku.prototype = new Mnk();

Gomoku.prototype.defaults = {
    cellsX: 15,
    cellsY: 15,
    k: 5
};
module.exports = Gomoku;

