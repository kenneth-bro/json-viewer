var defaults = require('./options/defaults');
var merge = require('./merge');

var OLD_NAMESPACE = "options";
var NAMESPACE = "v2.options";

module.exports = {
  save: function(obj) {
    return new Promise(function(resolve) {
      // 直接存对象，不再 JSON.stringify
      chrome.storage.local.set({ [NAMESPACE]: obj }, function() {
        resolve();
      });
    });
  },

  load: function() {
    return new Promise(function(resolve) {
      chrome.storage.local.get(NAMESPACE, function(result) {
        var options = result[NAMESPACE] || {};
        options.theme = options.theme || defaults.theme;
        if (typeof options.addons !== 'object') {
          options.addons = {};
        }
        options.addons = merge({}, defaults.addons, options.addons);
        if (typeof options.structure !== 'object') {
          options.structure = {};
        }
        options.structure = merge({}, defaults.structure, options.structure);
        options.style = options.style || defaults.style;
        resolve(options);
      });
    });
  },

  restoreOldOptions: function(optionsStr) {
    var oldOptions = localStorage.getItem(OLD_NAMESPACE);
    var options = null;

    if (optionsStr === null && oldOptions !== null) {
      try {
        oldOptions = JSON.parse(oldOptions);
        if(!oldOptions || typeof oldOptions !== "object") oldOptions = {};

        options = {};
        options.theme = oldOptions.theme;
        options.addons = {
          prependHeader: JSON.parse(oldOptions.prependHeader || defaults.addons.prependHeader),
          maxJsonSize: parseInt(oldOptions.maxJsonSize || defaults.addons.maxJsonSize, 10)
        }

        // Update to at least the new max value
        if (options.addons.maxJsonSize < defaults.addons.maxJsonSize) {
          options.addons.maxJsonSize = defaults.addons.maxJsonSize;
        }

        options.addons = JSON.stringify(options.addons);
        options.structure = JSON.stringify(defaults.structure);
        options.style = defaults.style;
        this.save(options);

        optionsStr = JSON.stringify(options);

      } catch(e) {
        console.error('[JSONViewer] error: ' + e.message, e);

      } finally {
        localStorage.removeItem(OLD_NAMESPACE);
      }
    }

    return optionsStr;
  }
};
