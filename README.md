# document-write-intervene

Overwrites `document.write` function and will prevent it from clearing your document contents due to how `document.write` works when the document has been loaded.

It checks if the markup is a `<script>` tag and will load it asynchronous. 

Otherwise it will insert the contents using `insertAdjacentHTML` on the `body`

## Installation

Install via npm:

```
$ npm install document-write-intervene
```

## Example

```
require('document-write-intervene')()
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
