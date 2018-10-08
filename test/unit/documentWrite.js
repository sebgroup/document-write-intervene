const sinon = require('sinon')
const { spy, stub } = sinon
const proxyquire = require('proxyquire')

describe('#documentWrite()', () => {
  let documentWrite
  let script

  beforeEach(() => {
    script = {
      isScript: stub(),
      injectScript: spy()
    }
    documentWrite = proxyquire('../../lib/documentWrite', {
      './script': script
    })
  })

  it('injects the script if the markup contains a script tag', () => {
    script.isScript.returns(true)
    documentWrite('<script></script>')
    sinon.assert.calledOnce(script.isScript)
    sinon.assert.calledWithExactly(script.injectScript, '<script></script>')
  })

  it(`prepends the markup to the body just like document.write would do
  on an unclosed document stream`, () => {
    const body = {
      insertAdjacentHTML: spy()
    }
    global.document = {
      getElementsByTagName: stub()
    }

    global.document.getElementsByTagName.returns([body])
    script.isScript.returns(false)

    documentWrite('<h3>big title</h3>')
    sinon.assert.calledWith(document.getElementsByTagName, 'body')
    sinon.assert.calledWithExactly(body.insertAdjacentHTML, 'afterbegin', '<h3>big title</h3>')
  })
})
