var Promise = require('es6-promise').Promise;
var loadCss = require('../load-css');
var themeDarkness = require('../theme-darkness');

function loadRequiredCss(options) {
  var loaders = [];
  loaders.push(loadCss({
    path: "assets/viewer.css",
    checkClass: "json-viewer-css-check"
  }));

  // 不再加载自定义主题 CSS
  // if (theme && theme !== "default") {
  //   loaders.push(loadCss({
  //     path: "themes/" + themeDarkness(theme) + "/" + theme + ".css",
  //     checkClass: "theme-" + theme + "-css-check"
  //   }));
  // }

  return Promise.all(loaders).then(function() {
    var style = document.createElement("style");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.innerHTML = options.style;
    document.head.appendChild(style);
  });
}

module.exports = loadRequiredCss;
