## React Portals

React does not support hydration for portals ([facebook/react#13097](https://github.com/facebook/react/issues/13097)). While Fluent UI tries to work out of the box without hydration warnings, some workarounds are required in certain edge cases.

### Default open

Components like `Menu` or `Popover` have a `defaultOpen` prop that open the positioned surface on mount. These components are rendered with React portals. In SSR using the `defaultOpen` on server render will cause a hydration error because React does not support hydration for portals.

The below example shows how to use the `useIsSSR` hook to implement a `Menu` that is open by default on the first render. Toggle the checkbox to mount/unmount the component.

Mount component
