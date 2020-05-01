# `@fluentui/react-context-selector`

React `useContextSelector()` and `useContextSelectors()` hooks in userland.

## Introduction

[React Context](https://reactjs.org/docs/context.html) and [`useContext()`](https://reactjs.org/docs/hooks-reference.html#usecontext) is often used to avoid prop drilling,
however it's known that there's a performance issue. When a context value is changed, all components that are subscribed with `useContext()` will re-render.

[useContextSelector](https://github.com/reactjs/rfcs/pull/119) is recently proposed. While waiting for the process, this library provides the API in userland.

# Installation

**NPM**

```bash
npm install --save @fluentui/react-context-selector
```

**Yarn**

```bash
yarn add @fluentui/react-context-selector
```

## Technical memo

React context by nature triggers propagation of component re-rendering if a value is changed. To avoid this, this library uses undocumented feature of `calculateChangedBits`. It then uses a subscription model to force update when a component needs to re-render.

## Limitations

- In order to stop propagation, `children` of a context provider has to be either created outside of the provider or memoized with `React.memo`.
- `<Consumer />` components are not supported.
- The [stale props](https://react-redux.js.org/api/hooks#stale-props-and-zombie-children) issue can't be solved in userland. (workaround with try-catch)

## Related projects

The implementation is heavily inspired by:

- [use-context-selector](https://github.com/dai-shi/use-context-selector)
- [react-tracked](https://github.com/dai-shi/react-tracked)
