## Auto formatting

We use [Prettier](https://prettier.io) to keep our code style consistent. You do not have to worry about formatting your source code as Prettier will take care of it for you. We ensure the code stays consistent by running Prettier as a pre-commit hook.

> If you use VS Code, you can use [this plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to help you run the formatter on save. Be sure to set `"prettier.requireConfig": true` in your user settings to only use Prettier in projects with a prettier config (to prevent its default settings from being applied to all code).

Prettier handles elements of formatting including:

- Single quotes (usually). Exceptions which use double quotes:
  - JSX attributes
  - Strings with single quotes inside
- 2 spaces for indentation
- Semicolons
- Curly braces around conditionals and loops
- Open curly braces don't go on a separate line

In addition, we use TSLint rules to enforce certain other formatting guidelines. TSLint is run while building and as a pre-commit hook.

## Other guidelines

**See the [TypeScript guidelines page](TypeScript-Guidelines) for more about recommended patterns.**

Some of these guidelines are enforced by TSLint rules, while others are just considered good practice.

### JSDoc

Use [JSDoc](http://usejsdoc.org/about-getting-started.html) comments for function, interfaces, enums, and classes. Be sure to include comments describing the item's functionality.

In TS files, **do not** include annotations in your doc comments which TS could infer from the context. These include:

- Type annotations (example: `{string}` in `@param {string} foo`)
- Class-related tags: `@class`, `@member`, `@abstract`, `@extends`, `@constructor`, `@implements`, `@member`, `@memberof`, `@static`, `@protected`
- `@export`, `@exports`, `@async`, `@constant`, `@enum`, `@function`, `@interface`, `@readonly`, `@typedef`
- `@private` (using `@internal` is okay to indicate something which is exported from its file is not meant as a public API; not necessary to use on private class members)
- `@this`: outside a class, include `this: sometype` as the first parameter in the function signature (it won't be included at runtime but tells TS the type of `this`)

(Exception: If the file is in JS, please DO use the extra type annotations to help with maintainability! This mostly just applies to build scripts.)

### Use camelCase when naming objects, functions, and instances.

This applies regardless of whether the function is internal or exported.

**Good**

```ts
const thisIsMyObject = {};
function thisIsMyFunction() {}
```

For utility files exporting a single function, the filename should be identical to the function's name (casing and all).

### Use PascalCase for classes / components / interfaces

**Good**

```tsx
class User {
  constructor(options) {
    this.name = options.name;
  }
}

// React component
const MyComponent = props => <div>{props.name}</div>;

interface ISampleInterface {
  name: string;
}
```

**Bad**

```ts
class user {
  constructor(options) {
    this.name = options.name;
  }
}

// React component
const myComponent = props => <div>{props.name}</div>;

interface sampleInterface {
  name: string;
}
```

### Use prefixed underscores to identify private consts, methods, and functions

```ts
const _privateConst = 1;

class Foo {
  private _member = 1;
}

function _privateFunction() {
  // ...
}
```

### Interface prefixing

Historically we've prefixed all interface names (and sometimes type names) with `I`, for example `IPerson`. In newer code, we're dropping this prefix.

Until all code is updated, please follow the convention for the package you're working in. This is enforced by lint rules.

### Avoid including the words Core, Utility, Common, or Helper in names

These words are generic and don't convey any meaning; use more descriptive words.
