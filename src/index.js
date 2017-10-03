var ascii = require('./tools/asciiBoard');
var strategies = require('./strategies');
var transforms = require('./tools/transforms');
var normalize = require('./tools/normalize');
var utils = require('./tools/utils');
var _defaults = require('lodash.defaults');


var defaults = {
    strategy: 'gomoku'
};

/**
 * A game instance can take an array of moves, and a configuration object. Both are optional.
 * Here we just have some logic to handle that.
 *
 * @param moves Array[move] Optional
 * @param config Object Optional
 * @returns Object
 */
function handleInputs(moves, config) {
    if (Array.isArray(moves)) {
        config = config || {};
        config.moves = moves;
    } else {
        config = moves;
    }
    config = _defaults({}, config, defaults);
    return config;
}

/**
 *
 * @param moves Array[move] Optional
 *      This is a shortcut for defining config.moves
 * @param config Object Optional
 *
 * @param config.moves Array[move] default: [], no moves
 *      A sequence of game moves, e.g. ['H8', 'H7', 'H9'];
 *
 * @param config.strategy String default: 'gomoku'
 *      A game strategy, currently supported: gomoku or ticTacToe
 *
 *
 *
 * @constructor
 */
function Game(moves, config) {
    config = handleInputs(moves, config);

    this.strategy = new strategies[config.strategy](config);
    this.config = this.strategy.config;
    this._applyFunctions();
    this.position = utils.generateEmptyPosition(this.strategy.config.cellsX, this.strategy.config.cellsY);
    this.reset();

    if (config.moves) {
        this.moveTo.apply(this, config.moves);
    }
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

    /**
     * Resets the game to the initial state
     */
    reset: function () {
        this.history = [];
        this.undoHistory = [];
        utils.emptyPosition(this.position);
        this.move = 1;
        return this;
    },
    setPosition: function (position) {
        this.position = utils.clonePosition(position);
        return this;
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
            if (!this.has(point)) {
                this.history.push(point);
                this.updatePoint(point[0], point[1], this.getNextMove());
            }
        }, this);
        return this;
    },

    /**
     * Returns true if there is a stone at the given coordinates
     *
     * @param point
     * @returns {boolean}
     */
    has: function (point) {
        point = this.strategy.toPoint(point);
        return this.position[point[0]][point[1]] !== 0;
    },

    /**
     * Go forward is history
     * @returns {Game}
     */
    forward: function () {
        if (this.undoHistory.length) {
            var point = this.undoHistory.pop();
            this.history.push(point);
            this.updatePoint(point[0], point[1], this.getNextMove());
        }
        return this;
    },

    /**
     * Go to the Nth move in history
     * @returns {Game}
     */
    jumpToMove: function (index) {
        while (index < this.history.length && index > 0) {
            this.back();
        }

        while (index > this.history.length) {
            this.forward();
        }

        return this;
    },

    /**
     * Go backwards in history
     * @returns {Game}
     */
    back: function () {
        if (this.history.length) {
            this.getPreviousMove();
            var point = this.history.pop();
            this.undoHistory.push(point);
            this.updatePoint(point[0], point[1], 0);
        }
        return this;
    },

    /**
     * Update a point at given coordinates
     * @param x
     * @param y
     * @param value
     * @returns {Game}
     */
    updatePoint: function (x, y, value) {
        this.position[x][y] = value;
        return this;
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
     * @returns {number}
     */
    getNextMove: function () {
        var result = this.move;
        this.move = this.move === 1 ? 2 : 1;
        return result;
    },

    /**
     * Return previous move stone index
     * @returns {number}
     */
    getPreviousMove: function () {
        return this.getNextMove();
    },

    /**
     * Generates ascii version of the board for easier debugging.
     *
     * @returns {string} ascii    qversion of the board
     *
     *     A  B  C
     * 3         x
     * 2      x
     * 1   o  x  o
     */
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
    _applyFunctions: function () {

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

    /**
     * Returns a copy of the game.
     *
     * @returns {Game}
     */
    clone: function () {
        var result = new Game(this.config);
        result.setPosition(this.position);
        return result;
    }


};


module.exports = Game;
