var utils = require('./utils');
var pad = require('pad');
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
    });
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
