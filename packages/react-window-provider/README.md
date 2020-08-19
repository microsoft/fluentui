# @fluentui/react-window-provider

A set of utilities for providing and consuming the `window` and `document` references in a contextual scope.

## Why is this needed?

When rendering on the main browser window, many components need access to `window` or `document` for applying styling, listening for events, or measuring things. However it is possible to render to child windows and elements hosted in `iframe` elements.

In these cases, the target element is hosted in a different context, and thus have a different `window` reference. To aid in providing components with the correct instances of `window` or `document`, React context can be used to provide the tree of React components with the correct instance.

## Usage

To consume the window or document object, call `useWindow` or `useDocument` respectively:

```jsx
const Foo = () => {
  const win = useWindow();
  const doc = useDocument();

  return </>
}
```

To provide a new window other than the default, wrap your app in the `WindowProvider` to override the defaults contextually:

```jsx
ReactDOM.render(
  <WindowProvider window={childWindow}>
    <...>
  </WindowProvider>,
  childWindowElement
);
```
