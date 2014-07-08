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
    this.undoHistory = [];
    this.position = emptyPosition(this.strategy.config.cellsX, this.strategy.config.cellsY);
    this.move = 1;
    this.applyFunctions();
}
Game.prototype = {
    /**
     * Get game position
     *
     * @returns Array[Array]
     *  e.g.
     *  [[1,0,2],
     *   [0,2,0],
     *   [1,0,0]]
     */
    getPosition: function () {
        return utils.clonePosition(this.position);
    },
    setPosition: function (position) {
        this.position = utils.clonePosition(position);
    },
    /**
     * Takes one or multiple board points.
     * Each of them can be represented as a string, e.g. 'h8', or as an array with x and y, e.g. [7,7]
     *
     * @returns {Game} for chaining
     */
    moveTo: function () {
        this.undoHistory = [];
        Array.prototype.map.call(arguments, function (point) {
            if (typeof point === 'string') {
                point = this.strategy.toPoint(point);
            }
            this.history.push(point);
            if (!this.has(point)) {
                this.updatePoint(point[0], point[1], this.getNextMove());
            }
        }, this);
        return this;
    },
    has: function (point) {
        point = this.strategy.toPoint(point);
        return this.position[point[0]][point[1]] !== 0;
    },

    forward: function () {
        if (this.undoHistory.length) {
            var point = this.undoHistory.pop();
            this.history.push(point);
            this.updatePoint(point[0], point[1], this.getNextMove());
        }
    },
    back: function () {
        if (this.history.length) {
            this.getPreviousMove();
            var point = this.history.pop();
            this.undoHistory.push(point);
            this.updatePoint(point[0], point[1], 0);
        }
    },

    updatePoint: function (x, y, value) {
        this.position[x][y] = value;
    },

    /**
     * Returns an array of game moves
     *
     * @returns Array[String] e.g. ["H8","H9","I8"]
     */
    getHistory: function () {
        return this.history.map(this.strategy.toXY.bind(this.strategy));
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
