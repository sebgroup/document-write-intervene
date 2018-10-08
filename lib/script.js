const scriptTag = /<script[\s\S]*?>[\s\S]*?<\/script>/gi
const srcProp = /<script.*?src="(.*?)"/gmi

function isScript (value) {
  return value.match(scriptTag) && value.match(srcProp)
}

function injectScript (markup) {
  const matches = srcProp.exec(markup)
  const src = matches[1]
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src
  const body = document.getElementsByTagName('body')[0]
  body.appendChild(script)
}

module.exports = {
  isScript,
  injectScript
}
