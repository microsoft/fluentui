# @fluentui/react-utilities

**React Utilities for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui) components**

## API

### childrenExist(children)

Tests if children are nil in React and Preact. React `children` can be one many types. See the [tests](./src/childrenExist.test.tsx) for all the covered cases.

Example:

```jsx
if (childrenExist(props.children)) {
  // render children.
}
```
