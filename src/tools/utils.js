var _range = require('lodash.range');
var rComma = /,/g;
module.exports = {
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
    stringify: function (position) {
        return position.join('').replace(rComma, '');
    }
};
