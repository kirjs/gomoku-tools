function Mnk() {

}

Mnk.prototype.fromXY = function (str) {
    var x = str.toUpperCase().charCodeAt(0) - 65;
    var y = this.config.cellsY - str.substr(1);
    return [ y, x];
};

module.exports = Mnk;