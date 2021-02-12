# @fluentui/make-styles

**Make Styles components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## 😕 Problems

### Perf is a problem

Styles are computed for each part of each component, including duplicate calculations when there are multiple instances of the same component on the page. Even with caching it slow compared to native CSS.

### Predictable style overrides

Current version of `makeStyles()` is heavily inspired by Material UI and depends on file evaluation order which makes complicated to use it with React Suspense, for example: https://codesandbox.io/s/kind-davinci-xvwxg

There is also no way to solve CSS specificity issues for styles overrides.

### Improve Developer Experience

_For Northstar:_ Style files are currently hard to read and manage due to their complexity. The complexity is caused by heavily nested conditionals and the use of abstractions (like helper functions). Styles also decoupled from components that caused an additional indirection.

## 📜 Key notes

The new iteration of `makeStyles()` splits the expensive part (processing styles, generating classnames) and the cheap part (merging classnames), expensive part can be done build time. Code also intentionally separated to highlight required part of `makeStyles()` and runtime. A production version of `makeStyles()` currently is less than 200 LoC.

It uses the similar side effect approach as in `useCSS` hook and Emotion ([#14470](https://github.com/microsoft/fluentui/pull/14470)) (passing down classnames but referrencing a dictionary when merging).

We use hash based atomic classnames, this makes deterministic (vs Fela is sequential = non-deterministic), it simplifies support server side rendering.

Tokens (theme, siteVariables) are injected as CSS variables, can easily fallback to runtime evaluation in IE 11 without any change required on component/overrides side. However, this will require bundling of runtime part.

## 📦 Current API proposal

Anything can change based on feedback, but current API is shown below:

```ts
const useStyles = makeStyles([
  [null, { color: 'red' }],
  [selectors => selectors.color === 'green', { color: 'green' }]
])

//

useStyles() // returns a classname for "color: red"
useStyles({ color: 'green' }}  // returns a classname for "color: green"
```

### Why selectors and styles are separated?

It removes any conditions in styles and and allows easily transform them to CSS.

### Why selectors are functions?

This allows to match styles in a single loop i.e. the best performance option that we have.

I also evaluated matchers approach (https://github.com/microsoft/fluent-ui-react/pull/1301), but we need have to compare there two objects:

```ts
// ⚠️ not a real API

const useStyles = makeStyles([
  [null, { color: 'red' }],
  [{ color: 'green' }, { color: 'green' }],
]);
```

Another idea that was not enough performant is to transform these matchers to bitmasks. It also was slower as we need to transform user's input masks which gives us a second loop 🐌:

```ts
const masks = {
  default: 0, // null
  colorgreen: 1,
};
```

It also made code complicated for understanding and debugging.

### How about static styles?

There is a separate API `makeStaticStyles` for this case.

It can be used to register styles object:

```ts
makeStaticStyles({
  '@font-face': {
    fontFamily: 'Open Sans',
    src: `url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
         url("/fonts/OpenSans-Regular-webfont.woff") format("woff")`,
  },
  body: {
    background: 'red',
  },

  /**
   * ⚠️ nested and pseudo selectors are not supported for this scenario via nesting
   *
   * Not supported:
   * .some {
   *   .class { ... },
   *   ':hover': { ... }
   * }
   *
   * Supported:
   * '.some.class': { ... }
   * '.some.class:hover': { ... }
   */
});
```

Or string:

```ts
makeStaticStyles('body { background: red; } .foo { color: green; }');
```

Or array of styles object/string:

```ts
makeStaticStyles([
  {
    '@font-face': {
      fontFamily: 'Open Sans',
      src: `url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
          url("/fonts/OpenSans-Regular-webfont.woff") format("woff")`,
    },
  },
  {
    '@font-face': {
      fontFamily: 'My Font',
      src: `url(my_font.woff)`,
    },
  },
});
```

# Proposed build structure

```
/make-styles
  /babel - contains babel plugin/preset for built time - 0 kb
  /runtime - in dev contains all required utils, in prod - noop i.e. 0kb
  /runtime-ie11 - in dev - alias to runtime, in prod - optimized runtime 20kb
```
