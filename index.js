var page = require('webpage').create();

page.settings.loadImages = false;

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

page.open('http://taobao.com');
