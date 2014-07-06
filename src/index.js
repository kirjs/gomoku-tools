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
    config = _defaults({}, config, defaults);
    this.strategy = new strategies[config.strategy](config);
    this.config = this.strategy.config;
    this.history = [];
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
    /**
     * Takes one or multiple board cells.
     * Each of them can be represented as a string, e.g. 'h8', or as an array with x and y, e.g. [7,7]
     *
     * @returns {Game} for chaining
     */
    moveTo: function () {
        Array.prototype.map.call(arguments, function (cell) {
            if (typeof cell === 'string') {
                cell = this.strategy.fromXY(cell);
            }
            this.history.push(cell);
            this.updateCell(cell[0], cell[1], this.getNextMove());
        }, this);
        return this;
    },


    back: function () {
        if (this.history.length) {
            this.getPreviousMove();
            var cell = this.history.pop();
            this.updateCell(cell[0], cell[1], 0);
        }
    },

    updateCell: function (x, y, value) {
        this.position[x][y] = value;
    },

    /**
     * This function is meant to calculate the color of the next stone.
     * For now we are using a simple mechanism that swaps the stone every time.
     *
     * May have to be rewritten once we want to support more advanced games like connect 6
     *
     * @returns {number|Game.move|*}
     */
    getNextMove: function () {
        var result = this.move;
        this.move = this.move === 1 ? 2 : 1;
        return result;
    },
    getPreviousMove: function () {
        return this.getNextMove();
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


};


module.exports = Game;
