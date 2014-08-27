var detectBlocks = function(canvas, colors) {
    var ctx = canvas.getContext('2d');
    var pix = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    var tmpImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var tmp = tmpImageData.data;
    var index = 0;
    colors = colors.filter(function(color) {
        return color.weight > 10;
    });
    setInterval(function() {
        // 二值化
        var target = colors[index % colors.length].color;
        var rgb = JSON.parse(target);
        index++;
        var color;
        for(var i = 0, len = pix.length; i < len; i += 4) {
            color = JSON.stringify([pix[i], pix[i+1], pix[i+2]]);
            if(color === target) {
                tmp[i] = rgb[0];
                tmp[i+1] = rgb[1];
                tmp[i+2] = rgb[2];
                tmp[i+3] = 255;
            } else {
                tmp[i+3] = 0;
            }
        }
        ctx.putImageData(tmpImageData, 0, 0);
    }, 1000);
};
