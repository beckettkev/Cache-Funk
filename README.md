## Synopsis

Cache-Funk is a simple helper library for interacting with the web browser's local storage cache. It introduces the concept of limited life span caches and cache inserts to local storage.

## Code Example
```javascript
	imports { exists, fetch, insert, store, remove } from cache-funk

	store('KeyName', ['data','data','data','data']);
```
## Motivation

The aim of this project is to allow you to extend existing local storage cache entries and set life spans for content stored in your local storage cache (so that they can be replaced when they become stale).

## Installation

When you have done that, install **cache-funk** by npm:
```node
npm i cache-funk --save
```
You will then need to install the dependencies:
```node
npm i
```

## Tests

To run lint against the JavaScript code in **cache-funk**

```
npm run lint
```

To run spec tests against **cache-funk**
```
npm run test
```

## Contributors

> @beckettkev

## License

The MIT License (MIT)

Copyright (c) 2016 beckettkev
