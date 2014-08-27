// 二值图像联通区域检测
// Label connected components in 2-D binary image

// See also: http://www.cnblogs.com/ronny/p/img_aly_01.html

var label = function(data, width, height) {
    var lines = [];

    var piece; // 匹配线段

    var line;

    // scan line by line
    // each piece is [start, end)
    for(var l = 0; l < height; l++) {
        line = [];
        piece = [];
        for(var c = 0; c < width; c++) {
            if(data[l][c] > 0) { // is white!
                // piece start
                if(piece.length === 0) piece[0] = c;
            } else { // is black
                // piece end
                if(piece.length === 1) piece[1] = c;
                // push & reset
                line.push(piece);
                piece = [];
            }
        }
        // line end
        if(piece.length === 1) {
            // piece end
            piece[1] = width;
            // push & reset
            line.push(piece);
            piece = [];
        }
        lines.push(line);
    }

    // 分组
    
    var groups = [];
    var group;
    lines.forEach(function(pieces, lineNumber) {
        var lastLine = lineNumber - 1;
        pieces.forEach(function(piece) {
            for(var i = 0; i < groups.length; i++) {
                group = groups[i];
                if(!group[lastLine]) continue;
                var match = group[lastLine].some(function(_piece) {
                    // 判断有无重叠
                    if(_piece[0] >= piece[1]) return false;
                    if(piece[0] >= _piece[1]) return false;
                    return true;
                });
                if(match) {
                    group[lineNumber].push(piece);
                    return;
                }
            }
            // not in any group
            // create new group
            group = {};
            group[lineNumber] = [piece];
            groups.push(group);
        });
    });

    return groups;
};
