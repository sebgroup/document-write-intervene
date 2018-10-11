"use strict";

var scriptTag = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
var srcProp = /<script.*?src="(.*?)"/gmi;

function isScript(value) {
  return value.match(scriptTag) && value.match(srcProp);
}

function injectScript(markup) {
  var matches = srcProp.exec(markup);
  var src = matches[1];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(script);
}

module.exports = {
  isScript: isScript,
  injectScript: injectScript
};