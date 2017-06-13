"use strict";

require("../symbol-es6");

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