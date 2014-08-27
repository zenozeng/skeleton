
var page = require('webpage').create();

page.settings.loadImages = false;

// try this when phantomjs2.0 comeout
// page.settings.loadImages = true;
// img { -webkit-filter: brightness(0%) ! important; }


var isLoading = true;
var wait = 3000;
var timeout = null;

var onLoaded = function() {
    console.log('loaded!');
    var succ = page.injectJs('inject.js');
    console.log(succ);
    setTimeout(function() {
        page.render('output.png');
        phantom.exit(0);
    }, 1000);
};

// don't use window.onload
// some parts of the page may be lazy

page.onResourceRequested = function(requestData, request) {
    if(timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(function() {
        isLoading = false;
        onLoaded();
    }, wait);
    console.log('::loading', requestData['url'], '\n');
};

page.open('http://tmall.com', function() {
    page.evaluate(function() {
        var css = 'body { background: #000 };'
                + 'img { -webkit-filter: brightness(0%) ! important; }';
        var style = document.createElement('style'),
            text = document.createTextNode(css);
        style.setAttribute('type', 'text/css');
        style.appendChild(text);
        document.head.insertBefore(style, document.head.firstChild);
    });
});
