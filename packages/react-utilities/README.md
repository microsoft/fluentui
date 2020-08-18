# @fluentui/react-utilities

Utilities for providing and consuming window/document objects.

## Details

Many components need to access window or document. However when rendering content from a host frame via projection to a child window or `iframe`, the `window` and `document` references are not valid and should be pointing to the correct child window.

The `WindowProvider` component uses context to provide the correct window, so that users rendering content can override these values contextually:

```jsx
<WindowProvider window={childWindow}>
  <...>
</WindowProvider>
```

Components can access the window/document objects through `useWindow` and `useDocument` hooks:

```jsx
const Foo = () => {
  const win = useWindow();
  const doc = useDocument();

  React.useEffect(() => {
    win.addEventListener('resize', () => console.log('resized'));
    doc.classList.add('foo');
  });

  return </>;
}
```
