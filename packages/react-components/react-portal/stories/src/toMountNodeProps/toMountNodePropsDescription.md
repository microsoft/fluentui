Fluent UI uses a wrapper component called `Portal` to render portals using [`ReactDOM.createPortal()`](https://react.dev/reference/react-dom/createPortal).
`Portal` component accepts a `mountNode` prop that can be used to specify the DOM node where the portal should be rendered. That prop also accepts an object that allows to configure rendering of a mount node.

For example, you can pass `className` to add a class to the mount node:

```tsx
import { Portal } from '@fluentui/react-components';

const MyComponent = () => (
  <Portal
    mountNode={{
      className: 'my-mount-node',
    }}
  >
    <div>Portal content</div>
  </Portal>
);
```

To ensure that props normalization is consistent across all components, we use `toMountNodeProps` function to normalize `mountNode` prop.

```tsx
import { toMountNodeProps } from '@fluentui/react-components';

toMountNodeProps(element); // { element: element }
toMountNodeProps({ className: 'my-mount-node' }); // { className: 'my-mount-node' }
```

This function is used internally by `Portal` component, but it can be also used to build custom components that accept `mountNode` prop.

### Customizing z-index

The generated portal mount node creates a stacking context. To customize its `z-index`, pass a class through `mountNode={{ className }}` and define the `zIndex` in that class. The Default example below demonstrates this by merging a custom class with the normalized mount node props. The same approach works with components that expose `mountNode`, such as `DialogSurface`.

When `mountNode` is an existing element (or an object with `element`), the portal renders directly into that element instead of creating a mount node. Style the existing element yourself; `mountNode.className` only styles a generated mount node.

Choose the value to fit your application's stacking order. Changing the surface's `z-index` alone cannot move it outside the mount node's stacking context. See [Stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Stacking_context) for how ancestor stacking contexts affect layering.
