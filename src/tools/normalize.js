var transforms = require('./transforms');
var utils = require('./utils');

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
