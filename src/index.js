var ascii = require('./tools/asciiBoard');
var strategies = require('./strategies');
var transforms = require('./tools/transforms');
var normalize = require('./tools/normalize');
var utils = require('./tools/utils');
var _defaults = require('lodash.defaults');
var _range = require('lodash.range');

var emptyPosition = function (x, y) {
    return _range(y).map(_range.bind(null, 0, x, 0));
};

var defaults = {
    strategy: 'gomoku'
};

function Game(config) {
    this.config = _defaults({}, config, defaults);
    this.strategy = new strategies[this.config.strategy](this.config);
    this.moves = [];
    this.position = emptyPosition(this.strategy.config.cellsX, this.strategy.config.cellsY);
    this.move = 1;
    this.applyFunctions();
}
Game.prototype = {
    getPosition: function () {
        return utils.clonePosition(this.position);
    },
    setPosition: function (position) {
        this.position = utils.clonePosition(position);
    },
    moveTo: function () {
        Array.prototype.map.call(arguments, function (cell) {
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
    /**
     * TODO:
     * Here I am trying to expose transform api my map each transform function
     * to work with the actual game object position
     *
     * I am looking for a better way to do that, as creating a multiple functions for every game instance
     * seems to be pretty expensive
     */
    applyFunctions: function () {

        var applyPositionTransform = function (transform) {
            return function () {
                this.position = transform(this.position);
            }.bind(this);
        }.bind(this);

        this.transform = {
            horizontal: applyPositionTransform(transforms.horizontal),
            vertical: applyPositionTransform(transforms.vertical),
            clockwise: applyPositionTransform(transforms.clockwise),
            counterClockwise: applyPositionTransform(transforms.counterClockwise),
            diagonalFromLeftTopToRightBottom: applyPositionTransform(transforms.diagonalFromLeftTopToRightBottom),
            diagonalFromRightTopToLeftBottom: applyPositionTransform(transforms.diagonalFromRightTopToLeftBottom),
            normalizeBasic: applyPositionTransform(normalize.basic)
        };
    },

    clone: function () {
        var result = new Game(this.config);
        result.setPosition(this.position);
        return result;
    }


}
;


module.exports = Game;
