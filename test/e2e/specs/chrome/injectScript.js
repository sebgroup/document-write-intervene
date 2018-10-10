const { expect } = require('chai')
const { Builder, By } = require('selenium-webdriver')
const server = require('../../server')

describe('injecting script', () => {
  let driver
  let html
  let script

  before(() => {
    driver = new Builder()
      .forBrowser('chrome')
      .usingServer('http://localhost:4444/wd/hub')
      .build()
  })

  after(() => {
    driver.quit()
  })

  beforeEach(async () => {
    await server.start()
  })

  afterEach(() => {
    server.stop()
  })

  it('injects the script correctly when we intervene', async () => {
    html = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="bundle.js"></script>
      </head>
      <body>
        <h1>it works</h1>
        <script>
          window.onload = function () {
            var string = "<script src=foo.js></scr" + "ipt>"
            document.write(string)
          }
      </script>
      </body>
    </html>
    ` // </scr" + "ipt>" is used to trick the browser not consider that as the closing script tag

    script = `
      const { intervene } = require('./lib/index.js')
      intervene()
    `

    server.configure({
      html,
      script
    })

    await driver.get('http://localhost:3000')
    const h1 = await driver
      .findElement(By.tagName('h1'))
      .getAttribute('innerHTML')

    expect(h1).to.equal('it works')

    const scriptTag = await driver
      .findElement(By.xpath('/html/body/script[1]'))
      .getAttribute('src')

    expect(scriptTag).contain('foo.js')
  })
})
