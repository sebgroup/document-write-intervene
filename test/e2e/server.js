const http = require('http')
const browserify = require('browserify-string')

let server
let _html
let _script

function configure ({
  html,
  script
}) {
  _html = html
  _script = script
}

function start () {
  return new Promise(resolve => {
    server = http
      .createServer((req, res) => {
        if (req.url === '/') {
          res.writeHeader(200, { 'Content-Type': 'text/html' })
          res.write(_html)
          return res.end()
        }
        if (_script) {
          return browserify(_script)
            .bundle()
            .pipe(res)
        }
        return res.end()
      })
      .listen(3000, () => {
        resolve()
      })
  })
}

function stop () {
  server.close()
}

module.exports = {
  start,
  stop,
  configure
}
