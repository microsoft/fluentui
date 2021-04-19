# @fluentui/react-portal

**React Portal components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

This package contains the `Portal` and `PortalProvider` components, which allow consumers to render [React portals](https://reactjs.org/docs/portals.html) with Fluent styling and RTL awareness.

## Usage

### Portal

`Portal` can be used as standalone with any part of a Fluent app. The component should be under a `FluentProvider` in the tree to make sure that proper theming and RTL handling is available.

By default `Portal` will render content to Fluent document body

```tsx
<FluentProvider>
  <Portal>Content rendered by default to Fluent's document.body</Portal>
</FluentProvider>
```

The mount location of the portal can be customized

```tsx
const node = document.getElementById('customNode');

<Portal mountNode={node}>Render to a custom node in DOM</Portal>;
```

### PortalProvider

By using the `PortalProvider` you can ensure that for more complicated apps, all portals under the provider are rendered to the same location. By default all portals will be hosted to a `div` on the Fluent document body. This can be overriden similarly to `Portal` with the `mountNode` prop

```tsx
<PortalProvider>
  <Portal>
    <ExamplePortalContent>Portal content</ExamplePortalContent>
  </Portal>
  <Portal>
    <ExamplePortalContent>Portal content</ExamplePortalContent>
  </Portal>
</PortalProvider>
```

### Styling

`Portal` and `PortalProvider` will both consume context from a parent `FluentProvider`, this way theme and RTL context are all inherited from a parent application.

Both components accept native DOM attributes such as `className` to style the node that mounds the portal content.
