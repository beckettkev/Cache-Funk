## Synopsis

Cache-Funk is a simple helper library for interacting with the web browser's local storage cache. It introduces the concept of limited life span caches and cache inserts to local storage.

## Code Example
```javascript
	imports { insert, add, delete } from cache-funk

	add('KeyName', ['data','data','data','data']);
```
## Motivation

The aim of this project is to allow you to extend existing local storage cache entries and set life spans for content stored in your local storage cache (so that they can be replaced when they become stale).

## Installation

Install webpack via npm (globally):
```node
npm install webpack -g
```
When you have done that, install **Goldfish** by npm:
```node
npm install cache-funk --save
```
You will then need to install the dependencies:
```node
npm install
```
Then you can build for development:
```node
webpack --progress
```
Or for production:
```node
npm run build
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
