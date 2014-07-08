var _range = require('lodash.range');
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
