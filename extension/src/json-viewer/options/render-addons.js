var jsonFormater = require('../jsl-format');

function renderAddons(CodeMirror, value) {
  var addonsInput = document.getElementById('addons');
  addonsInput.value = jsonFormater(JSON.stringify(value));

  return CodeMirror.fromTextArea(addonsInput, {
    mode: "application/ld+json",
    lineWrapping: true,
    lineNumbers: true,
    tabSize: 2
  });
}

module.exports = renderAddons;
