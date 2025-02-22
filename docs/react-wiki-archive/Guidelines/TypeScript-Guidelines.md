(Note: not all these guidelines are specific to TypeScript, but keeping the page name to avoid breaking links.)

## General principles

### Single responsibility

Module and classes should only have a single purpose. It is a code smell when we have modules with a lot of code in it.

Having a single purpose makes the code more easily testable. Often complex classes which do many things will retain internal state that makes things difficult to mock or to cover every permutation.

### Be wary of your browser matrix (Fluent UI React must support IE 11)

IE11 does not support most ES6+ features natively. The unsupported features fall into two categories: **APIs** which require polyfills and **must not** be used in published Fluent UI React code, and **syntax** which TypeScript can transpile out.

(Exception: code which runs in a Node environment, primarily tests and build scripts, can use ES6+ features.)

#### APIs

Published Fluent UI React code **must not** use ES6+ APIs which IE11 doesn't support, including (but not limited to) `[].find`, `WeakMap`, `IntersectionObserver`, `Promise`, `Object.assign`, and some features in `Map`. We do not provide polyfills and can't assume our consumers will do so.

Some of these can fail type checking if you set your `lib` in `tsconfig.json` to `["es5", "dom"]` only.

[caniuse.com](https://caniuse.com) and [these comprehensive compatibility tables](http://kangax.github.io/compat-table/es6/) are good resources for determining browser support.

#### Syntax

IE11 also doesn't support certain ES6+ syntax, such as classes and async functions. However, these are **safe to use** in published Fluent UI React code because TypeScript transpiles them down into ES5-compatible constructs.

## React guidelines

See [React guidelines page](react-guidelines).

## Formatting and naming

See [code style page](code-style).

## JavaScript/TypeScript guidelines

### Use `undefined` instead of `null`

JavaScript has 2 bottom values: `null` and `undefined`. While they do have different semantic meanings, in most cases we recommend using undefined to represent the absence of a value. The exception to this rule is when a third party API, like the return value of React's `render` method, expects null.

### Use `let` or `const` instead of `var`

Historically, the only way to create a variable in JavaScript was using the `var` keyword. The `var` keyword is function-scoped, which means the following code is valid JavaScript.

```ts
function foo() {
  if (true) {
    var x = 3;
  }
  console.log(x); // '3';
}
```

ES6 introduced `let` and `const`, which are block-scoped instead of function-scoped, so the code below produces an error:

```ts
function foo() {
  if (true) {
    let x = 3;
  }
  console.log(x); // 'x is not defined'
}
```

(TypeScript adds support for `let` and `const` when targeting ES5 through a combination of compile-time checking, and defining unique names for each declaration when needed.)

### Prefer functions over classes

ES6 and TypeScript both introduce the `class` keyword which allows for developers to use more familiar OO paradigms. However, JavaScript supports functions as first class citizens, so you often don't need to use classes. Instead, you can often just create a file (effectively, a module) that exports a bunch of functions. We feel this encourages developers to favor composition over inheritance. State can still be stored as a file-scoped variable if necessary. `class` is also unavailable in ES5, so TypeScript will actually generate a fair bit of boilerplate code to provide support for classes in older browsers.

The main difference between classes and files/modules is that classes can be instantiated. As a general guideline, if you are planning to have multiple instances of something with state associated with each instance (and/or planning to leverage inheritance), classes should be favored. However, if you are grouping logically-connected sets of stateless functions together or just need a singleton, a module is more appropiate.

The exception to this rule is React components, which can be defined as either classes or functions. See the [React guidelines page](react-guidelines) for more info about choosing between them.

### Use JavaScript plain objects instead of classes

It is often convenient to store state inside of a JavaScript object. Those coming from a C# background might be tempted to use a class for this purpose, but one can instead use JavaScript objects directly to achieve this purpose. In TypeScript, you can still achieve type safety by creating an `interface` or a `type` which describes the shape of your object. Note that TypeScript interfaces are very different from interfaces in C# since TypeScript uses "[duck typing](https://en.wikipedia.org/wiki/Duck_typing)". An example of using plain objects can be seen below:

```ts
interface IPerson {
  name: string;
  age: number;
}

let myPerson: Person = { name: 'David', age: 70 };
```

### Use arrow functions instead of `bind`

The `this` keyword in JavaScript has commonly been the source of [many developer frustrations](https://github.com/Microsoft/TypeScript/wiki/'this'-in-TypeScript), particularly when trying to call functions within a class from a callback. To make sure that you are bound to the right `this`, developers have typically written code like this:

```tsx
var onClick = this._handleClick.bind(this);
<button onClick={onClick}>
```

Starting with ES6, this can instead be achieved using arrow functions like this:

```tsx
() => this._handleClick();
```

For classes, you can also use arrow functions in place of instance methods to ensure correct binding of `this`.

```tsx
class MyComponent extends React.Component {
  public render() {
    return <button onClick={this._handleClick}>click me</button>;
  }

  private _handleClick = e => {
    // code
  };
}
```

### Avoid using `any`

Strive to provide type safety to your code by avoiding the use of the `any` keyword.

### Use `[]` instead of `Array`

TypeScript has two mechanisms for declaring an array, which are shown below. We prefer the `[]` notation over the `Array` keyword since this aligns with the open source JavaScript community.

```ts
// good
let list: number[] = [1, 2, 3];
// not so good
let list: Array<number> = [1, 2, 3];
```

### Use `for` or `for of` loops, especially in performance-sensitive code

Loops using `forEach` add function / closure allocation and add stack entries, which especially in legacy browsers can add overhead. Using `for of` will transpile into a transitional `for` loop which is proven to be slightly faster. Performance issues are death by a thousand paper cuts, so be aware to adopt best practices and in bulk it makes a difference.

[Performance comparison of for vs forEach](https://hackernoon.com/javascript-performance-test-for-vs-for-each-vs-map-reduce-filter-find-32c1113f19d7)

### Use [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), and [`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) instead of loops when appropriate

JavaScript has some great built in functions for common operations that happen in a loop.

Use `map` when the loop is transforming each item in an array and pushing it into a new array.

Use `filter` when building a new array which contains a subset of an old array. You can also use it prior to a `map` call to only apply the mapping to a subset of the array items.

### Use `===` and `!==` over `==` and `!=`

Use the type safe versions of the equality checks whenever possible. Remember, `8 == '8'` is true, but `8 === '8'` is false.

#### Don't use `===` with `NaN`

`NaN` will never `===` anything (including `NaN`). Use `isNaN(value)` instead.

### Use shortcuts for booleans, but be careful with strings and numbers

```ts
// bad
if (isValid === true) {
  // ...
}

// good
if (isValid) {
  // ...
}
```

JavaScript treats all values as [truthy or falsy](https://www.sitepoint.com/javascript-truthy-falsy/). Everything is truthy, except the following six values which are falsy: `false`, `0`, `''` (empty string), `null`, `undefined`, `NaN`.

_With some caveats_, this allows a simpler conditional check syntax: `if (foo) { ... }`). This is okay to use if `foo` is an object and you'd like to check whether it's defined. However, **be careful with strings and numbers** if `0` or `''` is a valid value!

Checking if a string is defined:

```ts
// bad if '' is a valid value for text
if (text) {
  // ...
}

// good
if (typeof text === 'string') {
  // ...
}
```

Checking if a number is defined:

```ts
// bad if 0 is a valid value
if (value) {
  // ...
}

// good (note that NaN is a number)
if (typeof value === 'number' && !isNaN(value)) {
  // ...
}
```

### Don't use `Boolean()`

Use `!!value` instead of `Boolean(value)`, or `!value` instead of `!Boolean(value)`.

### Use spread `...` instead of `Object.assign` to combine objects

`Object.assign` isn't supported in IE 11, but you can achieve similar results using the spread operator `...`, which TypeScript transpiles into something that works in all browsers.

```tsx
const foo = { a: 1 };
const bar = { b: 2 };

// Bad
const baz = Object.assign({}, foo, bar);

// Good
const baz = { ...foo, ...bar };
```

The one case not covered by spread is if you wanted to copy all of an object's properties into another _existing_ object (not a new one). In that case, you'd have to use a for loop.

```ts
// Bad
Object.assign(foo, bar);

// Good
for (let key of Object.keys(bar)) {
  foo[key] = bar[key];
}
```

### Avoid default exports

We typically don't use default exports in Fluent UI React. If you do want to export something as default, you should also export it as a named entity.

```js
// Good
export function foo() { ... }

// Acceptable
export default foo;
```

```js
// Bad
export default function foo() {}
```

## Acknowledgements

Many of these rules were inspired by the guidelines of Outlook Web, [Typescript](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines), [Pillar Studio](https://github.com/pillarstudio/standards/blob/master/reactjs-guidelines.md) and [AirBnb](https://github.com/airbnb/javascript)
