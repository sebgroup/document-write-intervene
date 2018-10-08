# document-write-intervene
[![Build Status](https://travis-ci.com/sebgroup/document-write-intervene.svg?token=tzrdkWGEu776AVobzRhp&branch=master)](https://travis-ci.com/sebgroup/document-write-intervene)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Overwrites `document.write` function and will prevent it from clearing your document contents due to how `document.write` works when the document has been loaded.

It checks if the markup is a `<script>` tag and will load it asynchronous. 

Otherwise it will insert the contents using `insertAdjacentHTML` on the `body`

Tested inside an Angular project.  

It should work seamlessly with a React project. 

Otherwise you could have a look at `browserify` to integrate it in your project

## Installation

Install via npm:

```
$ npm install @sebgroup/document-write-intervene
```

## Example

```
const { intervene } = require('@sebgroup/document-write-intervene')
intervene()
```

## Testing

Unit tests:

```
$ npm t
```

E2E tests:

```
$ npm run webdriver:start
```

and then 

```
$ npm run e2e
```
