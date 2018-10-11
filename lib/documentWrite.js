"use strict";

var _require = require('./script'),
    isScript = _require.isScript,
    injectScript = _require.injectScript;

function injectMarkup(markup) {
  var body = document.getElementsByTagName('body')[0];
  body.insertAdjacentHTML('afterbegin', markup);
}

function documentWrite(markup) {
  if (isScript(markup)) {
    return injectScript(markup);
  }

  return injectMarkup(markup);
}

module.exports = documentWrite;