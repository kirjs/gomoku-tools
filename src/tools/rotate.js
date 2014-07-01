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
        return position.map(arrayReverse);
    },

    /**
     * Mirrors position vertically
     *
     * @param position
     * @returns position
     */
    vertical: function (position) {
        return position.reverse();
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
    counterclockwise: function (position) {
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
