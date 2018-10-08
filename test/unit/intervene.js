const assert = require('assert')
const sinon = require('sinon')
const { spy } = sinon
const proxyquire = require('proxyquire')

describe('#intervene()', () => {
  let intervene
  let documentWrite

  beforeEach(() => {
    documentWrite = spy()
    intervene = proxyquire('../../lib/intervene', {
      './documentWrite': documentWrite
    })
    global.document = undefined
  })

  it('returns false if document is undefined', () => {
    const result = intervene()
    assert.strictEqual(result, false)
  })

  it('returns false if document.write is not a function', () => {
    global.document = {}
    const result = intervene()
    assert.strictEqual(result, false)
  })

  it('overrides document.write function', () => {
    const originalWrite = spy()
    global.document = {
      write: originalWrite
    }
    const result = intervene()
    assert.ok(result)

    global.document.write()
    sinon.assert.notCalled(originalWrite)
    sinon.assert.calledOnce(documentWrite)
  })
})
