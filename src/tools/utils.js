var rComma = /,/g;
module.exports = {
    clonePosition: function (position) {
        return position.map(function (line) {
            return line.slice();
        });
    },

    stringify: function (position) {
        return position.join('').replace(rComma, '');
    }
};
