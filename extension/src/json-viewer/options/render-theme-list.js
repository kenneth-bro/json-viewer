var jsonFormater = require('../jsl-format');
var loadCss = require('../load-css');
var themeDarkness = require('../theme-darkness');

var themeDefault = "default";
var themesList = process.env.THEMES;
var themeJSONExample = {
  title: "JSON Example",
  nested: {
    someInteger: 7,
    someBoolean: true,
    someArray: [
      "list of",
      "fake strings",
      "and fake keys"
    ]
  }
}

function onThemeChange(input, editor) {
  var selectedTheme = input.options[input.selectedIndex].value;
  var themeOption = selectedTheme; // 直接用主题名

  var currentLinkTag = document.getElementById('selected-theme');
  if (currentLinkTag !== null) {
    document.head.removeChild(currentLinkTag);
  }

  if (selectedTheme === "default") {
    editor.setOption("theme", "default");
  } else {
    editor.setOption("theme", themeOption);
  }
}

function renderThemeList(CodeMirror, value) {
  var themesInput = document.getElementById('themes');
  var themesExampleInput = document.getElementById('themes-example');
  themesExampleInput.innerHTML = jsonFormater(JSON.stringify(themeJSONExample));

  var themeEditor = CodeMirror.fromTextArea(themesExampleInput, {
    readOnly: true,
    mode: "application/ld+json",
    lineWrapping: true,
    lineNumbers: true,
    tabSize: 2,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });

  themesInput.onchange = function() {
    onThemeChange(themesInput, themeEditor);
  }

  var optionSelected = value;
  themesInput.appendChild(createOption(themeDefault, optionSelected));
  themesInput.appendChild(createThemeGroup("Light", themesList.light, optionSelected));
  themesInput.appendChild(createThemeGroup("Dark", themesList.dark, optionSelected));

  // 保证 select 选中项和配置一致
  themesInput.value = optionSelected;

  if (optionSelected && optionSelected !== "default") {
    themesInput.onchange();
  }
}

function createOption(theme, optionSelected) {
  var option = document.createElement("option");
  option.value = theme
  option.text = theme;

  if (theme === optionSelected) {
    option.selected = "selected";
  }

  return option;
}

function createGroup(label) {
  var group = document.createElement("optgroup");
  group.label = label;
  return group;
}

function createThemeGroup(name, list, optionSelected) {
  var group = createGroup(name);
  list.forEach(function(theme) {
    group.appendChild(createOption(theme, optionSelected));
  });
  return group;
}

module.exports = renderThemeList;
