[![NPM version](https://img.shields.io/npm/v/symbol-es6.svg)](https://www.npmjs.com/package/symbol-es6)
[![NPM total downloads](https://img.shields.io/npm/dt/symbol-es6.svg)](https://www.npmjs.com/package/symbol-es6)
[![Contributors](https://img.shields.io/github/contributors/rousan/symbol-es6.svg)](https://github.com/rousan/symbol-es6/graphs/contributors)
[![License](https://img.shields.io/github/license/rousan/symbol-es6.svg)](https://github.com/rousan/symbol-es6/blob/master/LICENSE)

# Symbol-ES6

Provides support for `ES6` Symbol API in `ES5` for older JS environments i.e. older browsers or NodeJS.

> ES6 Symbol polyfill in pure ES5.

## Install

### NPM

Install it from `npm` and `require` it before any other modules:

```bash
$ npm install --save symbol-es6
```

```javascript
require("symbol-es6");
```

### CDN

If you prefer CDN, then just insert it into your HTML page on the top of other scripts:

```html
<script src="https://cdn.jsdelivr.net/npm/symbol-es6/dist/symbol-es6.min.js"></script>
```

## Examples

```javascript
"use strict";

var ES6 = require("symbol-es6");

console.log(Symbol("bar") === Symbol("bar")); //false

var sym = Symbol.for("bar");
var sym2 = Symbol("bar");

console.log(Symbol.for("bar") === sym); //true
console.log(sym === sym2); //false
console.log(Symbol.keyFor(sym)); //bar
console.log(Symbol.keyFor(sym2)); //undefined

console.log(Array.from("Hello")); //[ 'H', 'e', 'l', 'l', 'o' ]

var it = [1, 2].entries();

console.log(it.next()); //{ done: false, value: [ 0, 1 ] }
console.log(it.next()); //{ done: false, value: [ 1, 2 ] }
console.log(it.next()); //{ done: true, value: undefined }

it = [1, 2].keys();

console.log(it.next()); //{ done: false, value: 0 }
console.log(it.next()); //{ done: false, value: 1 }
console.log(it.next()); //{ done: true, value: undefined }

function Bar() {
}
console.log(Object.prototype.toString.call(new Bar())); //[object Object]

Bar.prototype[Symbol.toStringTag] = "Bar";

console.log(Object.prototype.toString.call(new Bar())); //[object Bar]

it = "Bar"[Symbol.iterator]();

console.log(it.next()); //{ done: false, value: 'B' }
console.log(it.next()); //{ done: false, value: 'a' }
console.log(it.next()); //{ done: false, value: 'r' }


console.log(ES6.isSymbol({})); //fasle
console.log(ES6.isSymbol(sym)); ///true

function Baz() {

}
console.log(ES6.instanceOf(89, Baz)); //false
Object.defineProperty(Baz, Symbol.hasInstance, {
   value: function (value) {
       return typeof value === "number";
   }
});
console.log(ES6.instanceOf(89, Baz)); //true

ES6.forOf([1, 2], function (v) {
    console.log(v);
});
//1
//2

console.log(ES6.spreadOperator([]).spread("Bar").array()); //[ 'B', 'a', 'r' ]

function TestSpread() {
    return Array.prototype.reduce.call(arguments, function (acc, currvalue) {
        return acc + currvalue;
    }, 0);
}

console.log(ES6.spreadOperator(TestSpread).spread([1, 2, 3, 4, 5]).call()); //15

function Student(name, roll) {
    this.name = name;
    this.roll = roll;
}

console.log(ES6.spreadOperator(Student).spread(["Ariyan", 10]).new().name); //Ariyan
```

## Polyfills

* `Symbol`
    * `for()`
    * `keyFor`
    * `@@hasInstance`
    * `@@isConcatSpreadable`
    * `@@iterator`
    * `@@toStringTag`
    * `Symbol.prototype.toString()`
    * `Symbol.prototype.valueOf()`
    
* `Function`
    * `Function.prototype[@@hasInstance]()`
    
* `Array`
    * `Array.prototype.concat()` (ES6 version, addition of `@@isConcatSpreadable` support)
    * `Array.prototype[@@iterator]()`
    * `Array.from()`
    * `Array.prototype.entries()`
    * `Array.prototype.keys()`

* `Object`
    * `Object.prototype.toString()` (ES6 version, addition of `@@toStringTag` support)

* `String`
    * `String.prototype[@@iterator]()`


## Limitation

Some `ES6` features can't be implemented in `ES5` natively like `spread operator`, `for..of` loop,
`ES6` version of `instanceOf` operator etc. So this module exports a object named `ES6` globally,
that provides some approximate equivalent implementation of those features.

## `ES6` Object

This object provides,

* `isSymbol()` (It can be used as equivalent API of: `typeof symbol === 'symbol'`)
* `instanceOf()` (Provides ES6 version of `instanceOf`)
* `forOf()` (This method behaves exactly same as ES6 `for...of` loop)
* `spreadOperator` (Gives same functionality of the `spread operator` of ES6)

## Contributing

Your PRs and stars are always welcome.

Please, try to follow:

* Clone the repository.
* Checkout `develop` branch.
* Install dependencies.
* Add your new features or fixes.
* Build the project.

```sh
$ git clone https://github.com/rousan/symbol-es6.git
$ cd symbol-es6
$ git checkout develop
$ npm i
$ npm run build
```