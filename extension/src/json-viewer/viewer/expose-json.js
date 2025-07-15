function exposeJson(text, outsideViewer) {
  console.info("[JSONViewer] Your json was stored into 'window.json', enjoy!");

  if (outsideViewer) {
    window.json = JSON.parse(text);
  } else {
    // 通过 postMessage 传递 JSON 数据，避免 CSP 拦截
    window.postMessage({ type: 'JSON_VIEWER_SET_JSON', json: text }, '*');
  }
}

module.exports = exposeJson;
