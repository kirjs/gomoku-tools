!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.gomokuTools=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
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

},{"lodash._objecttypes":2,"lodash.keys":3}],2:[function(_dereq_,module,exports){
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

},{}],3:[function(_dereq_,module,exports){
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

},{"lodash._isnative":4,"lodash._shimkeys":5,"lodash.isobject":6}],4:[function(_dereq_,module,exports){
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

},{}],5:[function(_dereq_,module,exports){
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

},{"lodash._objecttypes":2}],6:[function(_dereq_,module,exports){
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

},{"lodash._objecttypes":2}],7:[function(_dereq_,module,exports){
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

},{}],8:[function(_dereq_,module,exports){
var ascii = _dereq_('./tools/asciiBoard');
var strategies = _dereq_('./strategies');
var transforms = _dereq_('./tools/transforms');
var normalize = _dereq_('./tools/normalize');
var utils = _dereq_('./tools/utils');
var _defaults = _dereq_('lodash.defaults');
var _range = _dereq_('lodash.range');

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

},{"./strategies":10,"./tools/asciiBoard":13,"./tools/normalize":14,"./tools/transforms":15,"./tools/utils":16,"lodash.defaults":1,"lodash.range":7}],9:[function(_dereq_,module,exports){
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


},{"./mnk":11,"lodash.defaults":1}],10:[function(_dereq_,module,exports){
module.exports = {
    gomoku: _dereq_('./gomoku'),
    mnk: _dereq_('./mnk'),
    ticTacToe: _dereq_('./ticTacToe')
};

},{"./gomoku":9,"./mnk":11,"./ticTacToe":12}],11:[function(_dereq_,module,exports){
function Mnk() {

}

Mnk.prototype.fromXY = function (str) {
    var x = str.toUpperCase().charCodeAt(0) - 65;
    var y = this.config.cellsY - str.substr(1);
    return [ y, x];
};

module.exports = Mnk;
},{}],12:[function(_dereq_,module,exports){
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

},{"./mnk":11,"lodash.defaults":1}],13:[function(_dereq_,module,exports){
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

},{}],14:[function(_dereq_,module,exports){
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

},{"./transforms":15,"./utils":16}],15:[function(_dereq_,module,exports){
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

},{"./utils":16}],16:[function(_dereq_,module,exports){
var rComma = /,/g;
module.exports = {
    clonePosition: function (position) {
        return position.map(function (line) {
            return line.slice();
        });
    },

    stringify: function (position) {
        return position.join('').replace(rComma, '');
    }
};

},{}]},{},[8])
(8)
});