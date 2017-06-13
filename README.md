# Symbol-ES6

Provides support for Symbol API of ES6 in ES5 for older JS environments i.e. older browsers or NodeJS.
To get full implementations of ES6 in ES5, install [es6-harmony](https://github.com/ariyankhan/es6-harmony) module. 

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

Some ES6 features can't be implemented in ES5 natively like `spread operator`, `for..of` loop,
ES6 version of `instanceOf` operator etc. So this module exports a object named `ES6` globally,
that provides some approximate equivalent implementation of those features.

## `ES6` Object

This object provides,

* `isSymbol()` (It can be used as equivalent API of: `typeof symbol === 'symbol'`)
* `instanceOf()` (Provides ES6 version of `instanceOf`)
* `forOf()` (This method behaves exactly same as ES6 `for...of` loop)
* `spreadOperator` (Gives same functionality of the `spread operator` of ES6)

    
## Examples

```javascript
"use strict";

require("symbol-es6");

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

## Installation

* In browser context, just insert this script on the top of other scripts
* For NodeJS, just install it from npm

    `npm install symbol-es6`

## Testing

  `npm test`
    
## Contributors

* [Ariyan Khan](https://github.com/ariyankhan)

## License

MIT License

Copyright (c) 2017 Ariyan Khan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

