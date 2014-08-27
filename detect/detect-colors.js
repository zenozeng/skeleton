var detectColors = function(imageData) {
    var colors = {};
    var pix = imageData.data;
    var color = null;
    for(var i = 0, len = pix.length; i < len; i += 4) {
        color = JSON.stringify([pix[i], pix[i+1], pix[i+2]]);
        if(typeof colors[color] === "undefined") {
            colors[color] = 1;
        } else {
            colors[color] = colors[color] + 1;
        }
    }
    var _colors = [];
    for(var k in colors) {
        _colors.push({color: k, weight: colors[k]});
    }
    return _colors.sort(function(a, b) { return b.weight - a.weight; });
};
