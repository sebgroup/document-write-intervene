const { expect } = require('chai')
const { Builder, By } = require('selenium-webdriver')
const server = require('../server')

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

  it('overwrites the document when used after document loaded', async () => {
    html = `
    <!DOCTYPE html>
    <html>
      <head></head>
      <body>
        <h1>it works</h1>
      </body>
      <script>
          window.onload = function () {
            var string = "<script src=foo.js></scr" + "ipt>"
            document.write(string)
          }
      </script>
    </html>
    ` // </scr" + "ipt>" is used to trick the browser not consider that as the closing script tag

    server.configure({
      html
    })

    await driver.get('http://localhost:3000')
    const bodyElement = await driver
      .findElements(By.tagName('body'))[0]

    expect(bodyElement).to.eql(undefined)
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
      const { intervene } = require('./index.js')
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
