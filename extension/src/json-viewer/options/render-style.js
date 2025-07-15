var defaults = require('./defaults');

function renderStyle(CodeMirror, value) {
  var styleInput = document.getElementById('style');
  // value 应该是字符串，兜底用默认样式
  if (typeof value !== 'string' || !value) {
    value = '/*\n * 在这里自定义 JSON 预览区的样式，例如：\n * .CodeMirror {\n *   font-size: 16px;\n *   line-height: 1.5;\n * }\n */\n';
  }
  styleInput.value = value;

  return CodeMirror.fromTextArea(styleInput, {
    mode: "css",
    lineWrapping: true,
    lineNumbers: true,
    tabSize: 2,
    extraKeys: {"Ctrl-Space": "autocomplete"}
  });
}

module.exports = renderStyle;
