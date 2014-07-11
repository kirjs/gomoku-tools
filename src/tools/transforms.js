var utils = require('./utils');
var ascii = require('./asciiBoard');
var pad = require('pad');
/**
 * This is a rather naive implementation of board mirroring flipping and rotations.
 *
 * At some point I am planning to spend some time making it faster
 * @param array
 * @returns position
 */


var transforms = {
    x: function (x) {
        return x;
    },
    y: function (x, y) {
        return y;
    },
    negX: function (x, y, size) {
        return size - x;
    },
    negY: function (x, y, size) {
        return size - y;
    }
};

function transform(position, transformX, transformY) {
    var result = [];
    var verticalSize = position.length - 1;
    for (var x = 0; x < position.length; x++) {
        for (var y = 0; y < position[x].length; y++) {
            var nx = transformX(x, y, verticalSize);
            var ny = transformY(x, y, verticalSize);
            if (!result[nx]) {
                result[nx] = [];
            }
            result[nx][ny] = position[x][y];
        }
    }
    return result;
}

module.exports = {
    /**
     * Mirrors position horizontally
     *
     * @param position
     * @returns position
     */
    horizontal: function (position) {
        return transform(position, transforms.x, transforms.negY);
    },

    /**
     * Mirrors position vertically
     *
     * @param position
     * @returns position
     */
    vertical: function (position) {
        return transform(position, transforms.negX, transforms.y);
    },

    /**
     * Rotate position clockwise
     *
     * @param position
     * @returns position
     */
    clockwise: function (position) {
        return transform(position, transforms.y, transforms.negX);
    },

    /**
     * Rotate the position 45 degrees, pad empty space with 0's
     * note, that this a quick and naive implementation won't work if one cell takes more than one char, and is
     * generally not very efficient, has to be rewritten
     * e.g. 1 0  turns into 0(1 0)
     *      2 1            (2 1)0
     *
     * @param position
     */
    clockwise45: function (position) {
        var shift = position.length;
        var lineWidth = position[0].length;
        var totalWidth = shift + lineWidth - 1;
        return position.map(function (line) {
            shift--;
            return pad(pad(shift + lineWidth, line.join(''), '0'), totalWidth, '0').split('');

        });
    },

    /**
     * Rotate the position 45 degrees, pad empty space with 0's
     * note, that this a quick and naive implementation won't work if one cell takes more than one char, and is
     * generally not very efficient, has to be rewritten
     * e.g. 1 0  turns into 0(1 0)
     *      2 1            (2 1)0
     *
     * @param position
     */
    counterClockwise45: function (position) {
        var shift = position.length;
        var lineWidth = position[0].length;
        var totalWidth = shift + lineWidth - 1;
        return position.map(function (line) {
            shift--;
            return pad(totalWidth, pad(line.join(''), shift + lineWidth, '0'), '0').split('');
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
        return transform(position, transforms.negY, transforms.x);
    },


    /**
     * Flips position diagonally from top left to bottom right corner
     *
     *
     * @param position
     * @returns position
     */
    diagonalFromLeftTopToRightBottom: function (position) {
        return transform(position, transforms.negY, transforms.negX);
    },


    /**
     * Flips position diagonally from top right to bottom left corner
     *
     *
     * @param position
     * @returns position
     */
    diagonalFromRightTopToLeftBottom: function (position) {
        return transform(position, transforms.y, transforms.x);
    }

};
