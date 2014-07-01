var Mnk = require('./mnk');
var _ = require('lodash');

function Gomoku(config) {
    this.config = _.defaults({}, config, this.defaults);

}
Gomoku.prototype = new Mnk();

Gomoku.prototype.defaults = {
    cellsX: 15,
    cellsY: 15,
    k: 5
};
module.exports = Gomoku;

