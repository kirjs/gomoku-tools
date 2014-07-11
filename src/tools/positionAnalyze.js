var transforms = require('./transforms');
function has5stones(position) {
    var strpos = position.join('|');
    return strpos.indexOf('1,1,1,1,1') !== -1 || strpos.indexOf('2,2,2,2,2') !== -1;
}

module.exports = {
    /**
     * Game is considered finished when there are 5 x's or 5 o's in a row.
     *
     * This is a rather naive implementation, which only works for gomoku games for now.
     * It also doesn't consider 6 in a row rule
     *
     * @param position
     * @returns {boolean}
     */
    isFinished: function (position) {
        return has5stones(position) ||
        has5stones(transforms.clockwise(position)) ||
        has5stones(transforms.clockwise(transforms.clockwise45(position))) ||
        has5stones(transforms.clockwise(transforms.counterClockwise45(position)));
    }
};
