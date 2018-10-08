const { expect } = require('chai')
const { Builder, By } = require('selenium-webdriver')
const server = require('../server')

describe('injecting html', () => {
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
            document.write("<h3>it b0rked</h3>")
          }
      </script>
    </html>
    ` // </scr" + "ipt>" is used to trick the browser not consider that as the closing script tag

    server.configure({
      html
    })

    await driver.get('http://localhost:3000')
    const bodyContent = await driver
      .findElement(By.tagName('body'))
      .getAttribute('innerHTML')

    expect(bodyContent).to.eql('<h3>it b0rked</h3>')
  })

  it('injects the html correctly when we intervene', async () => {
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
            document.write("<h3>it b0rked</h3>")
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
    const bodyContent = await driver
      .findElement(By.tagName('body'))
      .getAttribute('innerHTML')

    expect(bodyContent).to.contain('<h3>it b0rked</h3>')
    expect(bodyContent).to.contain('<h1>it works</h1>')
  })
})
