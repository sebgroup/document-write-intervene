"use strict";

var documentWrite = require('./documentWrite');

function hasDocumentWriteCapability() {
  var result;

  try {
    result = document && document.write && typeof document.write === 'function';
  } catch (ex) {
    result = false;
  }

  return result;
}

function intervene() {
  if (!hasDocumentWriteCapability()) {
    return false;
  }

  document.write = documentWrite;
  return true;
}

module.exports = intervene;