const assert = require('assert')
const sinon = require('sinon')
const { spy, stub } = sinon
const { isScript, injectScript } = require('../../lib/script')

describe('script', () => {
  describe('#isScript()', () => {
    it('fails for self terminated script tag', () => {
      const result = isScript('<script src="http://go-here"/>')
      assert.strictEqual(result, null)
    })

    it('fails for javascript :)', () => {
      const result = isScript('<javascscript src="http://go-here"></javascscript>')
      assert.strictEqual(result, null)
    })

    it('fails when src is missing', () => {
      const result = isScript('<script></script>')
      assert.strictEqual(result, null)
    })

    it('passes for http scripts', () => {
      const result = isScript('<ScriPt src="http://go-here"></script>')
      assert.ok(result)
    })

    it('passes for https scripts', () => {
      const result = isScript('<script src="https://assets.fake.domain/71e07657e.js"></script>')
      assert.ok(result)
    })
  })

  describe('#injectScript()', () => {
    let document
    let body

    beforeEach(() => {
      body = {
        appendChild: spy()
      }
      document = {
        createElement: stub(),
        getElementsByTagName: stub()
      }
      document.createElement.returns({})
      document.getElementsByTagName.returns([body])
      global.document = document
    })

    it('extracts the script src from the value and injects it async', () => {
      injectScript('<script src="https://assets.fake.domain/71e07657e.js"></script>')
      const script = {
        src: 'https://assets.fake.domain/71e07657e.js',
        type: 'text/javascript'
      }
      sinon.assert.calledWith(document.createElement, 'script')
      sinon.assert.calledWith(document.getElementsByTagName, 'body')
      sinon.assert.calledWith(body.appendChild, script)
    })
  })
})
