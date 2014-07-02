var _ = require('lodash');
var ascii = require('./tools/asciiBoard');
var strategies = require('./strategies');
var transforms = require('./tools/transforms');
var utils = require('./tools/utils');

var emptyPosition = function (x, y) {
    x = x || defaults.cellsX;
    y = y || defaults.cellsY;
    return _.range(y).map(_.range.bind(null, 0, x, 0))
};

defaults = {
    strategy: 'gomoku'
};

function Game(config) {
    config = _.defaults({}, config, defaults);
    this.strategy = new strategies[config.strategy](config);
    this.moves = [];
    this.position = emptyPosition(this.strategy.config.cellsX, this.strategy.config.cellsY);
    this.move = 1;

}
Game.prototype = {
    getPosition: function () {
        return utils.clonePosition(this.position);
    },

    moveTo: function () {
        _.map(arguments, function (cell) {
            this.moves.push(cell);
            var pos = this.strategy.fromXY(cell);
            this.position[pos[0]][pos[1]] = this.getNextMove();
        }, this);
        return this;
    },

    getNextMove: function () {
        var result = this.move;
        this.move = this.move === 1 ? 2 : 1;
        return result;
    },
    ascii: function () {
        return ascii(this.getPosition());
    },
    transform: {
        horizontal: transforms.horizontal,
        vertical: transforms.vertical,
        clockwise: transforms.clockwise,
        counterClockwise: transforms.counterClockwise,
        diagonalFromLeftTopToRightBottom: transforms.diagonalFromLeftTopToRightBottom,
        diagonalFromRightTopToLeftBottom: transforms.diagonalFromRightTopToLeftBottom
    }

};


module.exports = Game;
