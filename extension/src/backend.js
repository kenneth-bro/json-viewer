var Storage = require('./json-viewer/storage');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  try {
    if (request.action === "GET_OPTIONS") {
      Storage.load().then(function(options) {
        sendResponse({err: null, value: options});
      });
      return true;
    }
    if (request.action === "SET_OPTIONS") {
      Storage.save(request.value).then(function() {
        sendResponse({err: null, value: true});
      });
      return true;
    }
  } catch(e) {
    console.error('[JSONViewer] error: ' + e.message, e);
    sendResponse({err: e});
  }
});
