var Promise = require('es6-promise').Promise;

function getOptions() {
  return new Promise(function(resolve, reject) {
    chrome.runtime.sendMessage({action: "GET_OPTIONS"}, function(response) {
      var err = response && response.err;
      var value = response && response.value;

      if (err) {
        reject('getOptions: ' + err.message);
      } else {
        resolve(value);
      }
    });
  });
}

module.exports = getOptions;
