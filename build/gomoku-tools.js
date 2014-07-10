!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.gomokuTools=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
var Game = _dereq_('./src/index.js');

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

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./src/index.js":9}],2:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var keys = _dereq_('lodash.keys'),
    objectTypes = _dereq_('lodash._objecttypes');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object for all destination properties that resolve to `undefined`. Once a
 * property is set, additional defaults of the same property will be ignored.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {Object} object The destination object.
 * @param {...Object} [source] The source objects.
 * @param- {Object} [guard] Allows working with `_.reduce` without using its
 *  `key` and `object` arguments as sources.
 * @returns {Object} Returns the destination object.
 * @example
 *
 * var object = { 'name': 'barney' };
 * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
 * // => { 'name': 'barney', 'employer': 'slate' }
 */
var defaults = function(object, source, guard) {
  var index, iterable = object, result = iterable;
  if (!iterable) return result;
  var args = arguments,
      argsIndex = 0,
      argsLength = typeof guard == 'number' ? 2 : args.length;
  while (++argsIndex < argsLength) {
    iterable = args[argsIndex];
    if (iterable && objectTypes[typeof iterable]) {
    var ownIndex = -1,
        ownProps = objectTypes[typeof iterable] && keys(iterable),
        length = ownProps ? ownProps.length : 0;

    while (++ownIndex < length) {
      index = ownProps[ownIndex];
      if (typeof result[index] == 'undefined') result[index] = iterable[index];
    }
    }
  }
  return result
};

module.exports = defaults;

},{"lodash._objecttypes":3,"lodash.keys":4}],3:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to determine if values are of the language type Object */
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};

module.exports = objectTypes;

},{}],4:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = _dereq_('lodash._isnative'),
    isObject = _dereq_('lodash.isobject'),
    shimKeys = _dereq_('lodash._shimkeys');

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Creates an array composed of the own enumerable property names of an object.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns an array of property names.
 * @example
 *
 * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
 * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (!isObject(object)) {
    return [];
  }
  return nativeKeys(object);
};

module.exports = keys;

},{"lodash._isnative":5,"lodash._shimkeys":6,"lodash.isobject":7}],5:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Used to detect if a method is native */
var reNative = RegExp('^' +
  String(toString)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/toString| for [^\]]+/g, '.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
 */
function isNative(value) {
  return typeof value == 'function' && reNative.test(value);
}

module.exports = isNative;

},{}],6:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var objectTypes = _dereq_('lodash._objecttypes');

/** Used for native method references */
var objectProto = Object.prototype;

/** Native method shortcuts */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which produces an array of the
 * given object's own enumerable property names.
 *
 * @private
 * @type Function
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns an array of property names.
 */
var shimKeys = function(object) {
  var index, iterable = object, result = [];
  if (!iterable) return result;
  if (!(objectTypes[typeof object])) return result;
    for (index in iterable) {
      if (hasOwnProperty.call(iterable, index)) {
        result.push(index);
      }
    }
  return result
};

module.exports = shimKeys;

},{"lodash._objecttypes":3}],7:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var objectTypes = _dereq_('lodash._objecttypes');

/**
 * Checks if `value` is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // check if the value is the ECMAScript language type of Object
  // http://es5.github.io/#x8
  // and avoid a V8 bug
  // http://code.google.com/p/v8/issues/detail?id=2291
  return !!(value && objectTypes[typeof value]);
}

module.exports = isObject;

},{"lodash._objecttypes":3}],8:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Native method shortcuts */
var ceil = Math.ceil;

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to but not including `end`. If `start` is less than `stop` a
 * zero-length range is created unless a negative `step` is specified.
 *
 * @static
 * @memberOf _
 * @category Arrays
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} Returns a new range array.
 * @example
 *
 * _.range(4);
 * // => [0, 1, 2, 3]
 *
 * _.range(1, 5);
 * // => [1, 2, 3, 4]
 *
 * _.range(0, 20, 5);
 * // => [0, 5, 10, 15]
 *
 * _.range(0, -4, -1);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 4, 0);
 * // => [1, 1, 1]
 *
 * _.range(0);
 * // => []
 */
function range(start, end, step) {
  start = +start || 0;
  step = typeof step == 'number' ? step : (+step || 1);

  if (end == null) {
    end = start;
    start = 0;
  }
  // use `Array(length)` so engines like Chakra and V8 avoid slower modes
  // http://youtu.be/XAqIpGU8ZZk#t=17m25s
  var index = -1,
      length = nativeMax(0, ceil((end - start) / (step || 1))),
      result = Array(length);

  while (++index < length) {
    result[index] = start;
    start += step;
  }
  return result;
}

module.exports = range;

},{}],9:[function(_dereq_,module,exports){
var ascii = _dereq_('./tools/asciiBoard');
var strategies = _dereq_('./strategies');
var transforms = _dereq_('./tools/transforms');
var normalize = _dereq_('./tools/normalize');
var utils = _dereq_('./tools/utils');
var _defaults = _dereq_('lodash.defaults');


var defaults = {
    strategy: 'gomoku'
};

function Game(config) {
    config = _defaults({}, config, defaults);
    this.strategy = new strategies[config.strategy](config);
    this.config = this.strategy.config;
    this._applyFunctions();
    this.position = utils.generateEmptyPosition(this.strategy.config.cellsX, this.strategy.config.cellsY);
    this.reset();
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
            if (!this.has(point)) {
                this.history.push(point);
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

    clone: function () {
        var result = new Game(this.config);
        result.setPosition(this.position);
        return result;
    }


};


module.exports = Game;

},{"./strategies":11,"./tools/asciiBoard":14,"./tools/normalize":15,"./tools/transforms":16,"./tools/utils":17,"lodash.defaults":2}],10:[function(_dereq_,module,exports){
var Mnk = _dereq_('./mnk');
var _defaults = _dereq_('lodash.defaults');

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


},{"./mnk":12,"lodash.defaults":2}],11:[function(_dereq_,module,exports){
module.exports = {
    gomoku: _dereq_('./gomoku'),
    mnk: _dereq_('./mnk'),
    ticTacToe: _dereq_('./ticTacToe')
};

},{"./gomoku":10,"./mnk":12,"./ticTacToe":13}],12:[function(_dereq_,module,exports){
function Mnk() {

}

/**
 * @param point string e.g. H8
 * @returns Array(Number) e.g. [7,7]
 */
Mnk.prototype.toPoint = function (point) {
    if (typeof point !== 'string') {
        return point;
    }
    var x = point.toUpperCase().charCodeAt(0) - 65;
    var y = this.config.cellsY - point.substr(1);
    return [ y, x];
};


/**
 * @param xy Array(Number)  e.g. [7,7]
 * @returns string e.g. H8
 */
Mnk.prototype.toXY = function (xy) {
    if (typeof xy === 'string') {
        return xy;
    }
    var number = this.config.cellsY - xy[0];
    var letter = String.fromCharCode(65 + xy[1]);
    return letter + number;
};

module.exports = Mnk;

},{}],13:[function(_dereq_,module,exports){
var Mnk = _dereq_('./mnk');
var _defaults = _dereq_('lodash.defaults');

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

},{"./mnk":12,"lodash.defaults":2}],14:[function(_dereq_,module,exports){
function pad2(number) {
    return ( number > 9) ? number : (number + ' ');
}
var mapping = {
    '0': ' ',
    '1': 'x',
    '2': 'o'
};
var config = {
    paddingRight: ' '
};

/**
 * Generates ascii version of a board position.
 *
 * Example:
 * ------------------
 *       A  B  C
 *   3   x
 *   2      x
 *   1   o
 * ------------------
 *
 * @param position
 * @returns {string}
 */
module.exports = function (position) {

    var result = config.paddingRight + '   ';
    for (var x = 0; x < position.length; x++) {
        result += ' ' + String.fromCharCode(65 + x) + ' ';
    }

    result += '\n';
    for (var y = 0; y < position.length; y++) {
        result += config.paddingRight + pad2(position.length - y) + ' ';
        for (var i = 0; i < position.length; i++) {
            result += ' ' + mapping[position[y][i]] + ' ';
        }
        result += '\n';
    }

    return result;
};

},{}],15:[function(_dereq_,module,exports){
var transforms = _dereq_('./transforms');
var utils = _dereq_('./utils');

function basicCompare(a, b) {
    if (utils.stringify(a) > utils.stringify(b)) {
        return -1;
    } else if (a === b) {
        return 0;
    }
    return 1;
}

function findSpecial(compare, array) {
    var specialItem = array[0];
    for (var i = 1; i < array.length; i++) {
        if (compare(specialItem, array[i]) < 0) {
            specialItem = array[i];
        }
    }
    return specialItem;
}

module.exports = {
    basic: function (position) {


        var positions = [
            position,
            transforms.horizontal(position),
            transforms.vertical(position),
            transforms.clockwise(position),
            transforms.clockwise(transforms.clockwise(position)),
            transforms.counterClockwise(position),
            transforms.diagonalFromLeftTopToRightBottom(position),
            transforms.diagonalFromRightTopToLeftBottom(position)
        ];

        return findSpecial(basicCompare, positions);
    }
};

},{"./transforms":16,"./utils":17}],16:[function(_dereq_,module,exports){
var utils = _dereq_('./utils');
/**
 * This is a rather naive implementation of board mirroring flipping and rotations.
 *
 * At some point I am planning to spend some time making it more performant
 * @param array
 * @returns position
 */
function arrayReverse(array) {
    return array.reverse();
}


function transform(position, callback) {
    return position.map(function (line, i) {
        return line.map(function (cell, j) {
            return callback(position, i, j);
        });
    })
}


module.exports = {
    /**
     * Mirrors position horizontally
     *
     * @param position
     * @returns position
     */
    horizontal: function (position) {
        return utils.clonePosition(position).map(arrayReverse);
    },

    /**
     * Mirrors position vertically
     *
     * @param position
     * @returns position
     */
    vertical: function (position) {
        return utils.clonePosition(position).reverse();
    },

    /**
     * Rotate position clockwise
     *
     * @param position
     * @returns position
     */
    clockwise: function (position) {
        return transform(position, function (position, i, j) {
            return position[position.length - 1 - j][i];
        });
    },


    /**
     * Rotate position counter clockwise
     *
     *
     * @param position
     * @returns position
     */
    counterClockwise: function (position) {
        return transform(position, function (position, i, j) {
            return position[ j][position.length - 1 - i];
        });
    },


    /**
     * Flips position diagonally from top left to bottom right corner
     *
     *
     * @param position
     * @returns position
     */
    diagonalFromLeftTopToRightBottom: function (position) {
        return transform(position, function (position, i, j) {
            return position[ position.length - 1 - j][position.length - 1 - i];
        });
    },


    /**
     * Flips position diagonally from top right to bottom left corner
     *
     *
     * @param position
     * @returns position
     */
    diagonalFromRightTopToLeftBottom: function (position) {
        return transform(position, function (position, i, j) {
            return position[j][i];
        });
    }

};

},{"./utils":17}],17:[function(_dereq_,module,exports){
var _range = _dereq_('lodash.range');
var rComma = /,/g;
module.exports = {
    /**
     * Creates a copy of the position
     * @param position
     * @returns {Position}
     */
    clonePosition: function (position) {
        return position.map(function (line) {
            return line.slice();
        });
    },
    /**
     * Generate an empty 2d array filled with 0's
     * @param x width of tho array
     * @param y height of the array
     * @returns Array[Array[number]]
     */
    generateEmptyPosition: function (x, y) {
        return _range(y).map(_range.bind(null, 0, x, 0));
    },

    /**
     * Take an position and zero it out.
     *
     * I am explicitly mutating the incoming array instead of creating a new one.
     *
     * The reason for doing that is because the position is used in date binging on some other project.
     * I am not very happy with this solution and I am going to find a nicer and more generic way to
     * make the game instance data bindable
     *
     * @param position
     * @returns {*}
     */
    emptyPosition: function (position) {
        return position.reduce(function (position, line, x) {
            return line.reduce(function (position, point, y) {
                position[x][y] = 0;
                return position;
            }, position);
        }, position);
    },

    /**
     * Turns position into string.
     *
     * @param position e.g.
     *  [[0,0,0]
     *  ,[0,1,0]
     *  ,[0,0,0]]
     *
     * @returns string, e.g. 0000100000
     */
    stringify: function (position) {
        return position.join('').replace(rComma, '');
    }
};

},{"lodash.range":8}]},{},[1])
(1)
});
