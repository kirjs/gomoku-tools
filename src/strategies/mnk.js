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
