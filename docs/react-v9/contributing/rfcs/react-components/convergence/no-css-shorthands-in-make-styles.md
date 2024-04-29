# RFC: Do not allow CSS shorthands in `makeStyles()` calls

---

@layershifter

## Summary

This RFC proposes to forbid usage of [CSS shorthands](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) (`background`, `border`, `margin`, `padding`, etc.) in `makeStyles()` calls. Only CSS longhands (`backgroundColor`, `marginLeft`, `paddingLeft`, etc.) will be allowed for usage. This will solve the problem with expanding CSS shorthands, see [microsoft/fluentui#19402](https://github.com/microsoft/fluentui/issues/19402).

## Why expand shorthands?

```css
/* 💡 makeStyles() generates hashed classes, but it's not important in this example */
.a {
  background-color: red;
}
.b {
  background-color: green;
}
.c {
  color: yellow;
}
```

```html
<!-- Case 1: ❌ Wrong usage -->
<div class="a b c">Hello world!</div>
<!-- Case 2: ✅ Correct usage -->
<div class="a c">Hello world!</div>
<div class="b c">Hello world!</div>
```

- In "Case 1" both classes are applied to an element: it's wrong as result is not deterministic and depends on classes order in CSS definitions (i.e. insertion order)
- In "Case 2" only single classname per CSS property is applied, result will be deterministic

[🗃 CodeSandbox demo](https://codesandbox.io/s/css-insertion-order-matters-mgt6y)

This problem is solved by [`mergeClasses()`](https://github.com/microsoft/fluentui/blob/3769833c54950aec1f54297e0730ff6b92e65147/packages/make-styles/src/mergeClasses.ts) function: it de-duplicates classes based on property name.

```jsx
// ⚠ Simplified example
function App() {
  //                     👇 skips "a", returns only "b c"
  return <div className={mergeClasses('a', 'b', 'c')}>Hello world</div>;
}
```

To summarize: only non colliding properties should be applied to DOM elements with Atomic CSS. This works well for longhands, but there are cases when longhands and shorthands are combined:

```jsx
makeStyles({
  root: { backgroundColor: 'red', background: 'green' },
});
```

👆 In this example the problem is the same: both classes will be applied, result depends on insertion order. In the same time it's annoying for customers use longhands, for example:

```tsx
makeStyles({
  shorthands: {
    padding: '10px 15px 5px',
    border: '1px solid red',
  },
  longhands: {
    paddingTop: '10px',
    paddingRight: '15px',
    paddingBottom: '5px',
    paddingLeft: '15px',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'red',
    // ...
    // 9 more properties for other side i.e. "borderLeft*", "borderBottom*", "borderRight*"
  },
});
```

To allow use shorthands and longhands simultaneously `makeStyles()` currently uses [inline-style-expand-shorthand](https://github.com/robinweser/inline-style-expand-shorthand) (the same library is used in FluentUI Northstar, Fela\* & Styletron\*\* plugins).

- \* [Fela](https://fela.js.org/) is Atomic CSS-in-JS
- \*\* [Styletron](https://www.styletron.org/) has [`styletron-engine-atomic`](https://www.styletron.org/api-reference#styletron-engine-atomic) to work with Atomic CSS

**However** there are numerous issues with it (see [microsoft/fluentui#19402](https://github.com/microsoft/fluentui/issues/19402)), but the main problem is it's unclear what to do with CSS variables:

```js
// Input
const input = { padding: 'var(--foo)' };
// Output
const output = {
  /* is it safe to expand it at all? */
  paddingTop: 'var(--foo)',
  paddingRight: 'var(--foo)',
  paddingBottom: 'var(--foo)',
  paddingLeft: 'var(--foo)',
};
```

- ✅ it works fine when `--foo` is atomic value, for example `4px`
- ❌ it does not work when `--foo` is compound value, for example `4px 8px`

[🔗 CodeSandbox demo](https://codesandbox.io/s/inline-style-expand-shorthand-css-variables-n9mh3)

## Requirements

### Stay with deterministic Atomic CSS

It's important for scaling our library to stay with deterministic Atomic classes. For example, we can extract common styles to a stylesheet that will be used across all products.

### Unsupported styles should fail at build, not runtime

There were multiple options covered in the original issue (see [microsoft/fluentui#19402](https://github.com/microsoft/fluentui/issues/19402)), but during offline discussion we agreed to go with build time checks instead runtime and rely on TypeScript typings.

The motivation is simple: no one sees console noise, in big applications it usually 100+ development warnings only on initial load.

### Keep CSS properties

- Keep interop with any CSS var on any CSS property
- Keep all style properties to spec with CSS properties

This means that custom syntax is a **discarded solution**, for example:

```ts
// ⚠ discarded solution, used only for an example
makeStyles({
  rootA: {
    // 1️⃣ no custom properties
    paddingX: 'var(--foo)',
  },
  rootB: {
    // 2️⃣ no custom values
    padding: { left: 'var(--foo)', right: 'var(--foo)' },
    margin: { all: 'var(--foo)' },
  },
  rootC: {
    // 2️⃣ no custom values
    padding: ['var(--foo)', 'var(--foo)'],
  },
});
```

## Detailed Design or Proposal

### Ban CSS shorthands in typings

The first part of proposal is to ban CSS shorthands in typings: no shorthand properties = no need to expand them = no issues ✅

Proposed to forbid usage of all CSS shorthands ([list of CSS shorthands exported from MDN](https://csstree.github.io/docs/syntax/#report&noedit&title=CSS%20shorthand%20properties%20by%20MDN%20data&q=JGlzQXJyYXk6ID0%2BICQgIT0gKCQgKyAnJyk7Cm1kbi5wcm9wZXJ0aWVzLmVudHJpZXMoKS4oeyBpZHgsIG5hbWU6IGtleSwgLi4uKHZhbHVlIHwgeyBjb21wdXRlZCwgc3ludGF4IH0pIH0pLltjb21wdXRlZC4kaXNBcnJheSgpXQ%3D%3D&v=ewogICAgdmlldzogJ3RhYmxlJywKICAgIGNvbHM6IHsKICAgICAgICBpZHg6ICd0ZXh0OiMuaW5kZXggKyAxJywKICAgICAgICBjb21wdXRlZDogewogICAgICAgICAgICBoZWFkZXI6ICdwcm9wcycsCiAgICAgICAgICAgIGNvbnRlbnQ6ICd1bDpjb21wdXRlZCcKICAgICAgICB9CiAgICB9LAogICAgbGltaXQ6IGZhbHNlCn0%3D)) except vendor prefixed (i.e. `-ms`, `-webkit`).

```js
makeStyles({
  // 🚨 TypeScript will throw
  rootA: { padding: '4px' },
  // ✅ TypeScript will pass
  rootB: { paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px', paddingTop: '4px' },
});
```

### Create macro functions for expansion

As it will be annoying and redundant to use CSS longhands in every case we will have special functions for expansion.

```js
import { shorthands } from '@fluentui/react-make-styles';

makeStyles({
  rootA: { paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px', paddingTop: '4px' },
  rootB: {
    ...shorthands.padding('4px'),
    ...shorthands.padding('4px', '8px'),
    ...shorthands.padding('4px', '8px', '16px', 0),
  },
});
```

`shorthands.padding('4px')` from the example above will expand it two four properties:

```js
shallowEqual(
  { paddingLeft: '4px', paddingRight: '4px', paddingBottom: '4px', paddingTop: '4px' },
  shorthands.padding('4px'),
); // returns "true"
```

Each macro will implement arguments order & expand based on CSS spec.

For initial implementation following shorthands will be implemented:

- `border`
- `borderLeft`
- `borderBottom`
- `borderRight`
- `borderTop`
- `borderColor`
- `borderStyle`
- `borderRadius`
- `borderWidth`
- `margin`
- `padding`

Additional functions can be implemented based on customer requests.

- These functions will not have significant impact on runtime version of `makeStyles()` as they are very lightweight.
- These functions will not have **any** impact when Babel plugin/Webpack loader are used as they will be evaluated during build.

### Pros and Cons

- 👍 No CSS shorthands => no problems
- 👍 No new syntax
- 👎 Non obvious TypeScript errors in some cases
  - Might be solved with ESLint rules that will provide relevant information
- 👎 We have to explain this to users of `makeStyles` in our documentation

## Discarded Solutions

NA

## Open Issues

NA
