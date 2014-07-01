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
