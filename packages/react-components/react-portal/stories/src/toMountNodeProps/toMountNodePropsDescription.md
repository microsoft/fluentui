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
