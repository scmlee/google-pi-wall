// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

(function() {
    const path = require('path');
    const url = require('url');
    var fs = require('fs');

    var filepath = "./darkcal.css";
    cssToAppend = fs.readFileSync(filepath, { encoding : "utf-8", flag: "r"});

    document.getElementById("calendar-webview").addEventListener("did-finish-load", function() {
        webview = document.getElementById("calendar-webview");
        webview.insertCSS(cssToAppend);
    });
})();