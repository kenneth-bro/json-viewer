var Promise = require('es6-promise').Promise;
var MAX_WAIT = 20;

function loadCSS(opts) {
  var url = chrome.runtime.getURL(opts.path);

  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  if (opts.id) link.id = opts.id;

  document.head.appendChild(link);

  // 直接异步 resolve，不检测 content
  return new Promise(function(resolve) {
    setTimeout(resolve, 100);
  });
}

module.exports = loadCSS;
