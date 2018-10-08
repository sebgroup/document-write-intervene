const { isScript, injectScript } = require('./script')

function injectMarkup (markup) {
  const body = document.getElementsByTagName('body')[0]
  body.insertAdjacentHTML('afterbegin', markup)
}

function documentWrite (markup) {
  if (isScript(markup)) {
    return injectScript(markup)
  }

  return injectMarkup(markup)
}

module.exports = documentWrite
