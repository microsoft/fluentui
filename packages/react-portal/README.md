# @fluentui/react-portal

**React Portal components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

This package contains the `Portal` component, which allow consumers to render [React portals](https://reactjs.org/docs/portals.html) with Fluent styling and RTL awareness.

## Usage

### Portal

`Portal` can be used as standalone with any part of a Fluent app. The component should be under a `FluentProvider` in the tree to make sure that proper theming and RTL handling is available.

By default `Portal` will render content to `document body`

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

### Styling

`Portal` renders React children directly to the default/configured DOM node. Therefore styling should be applied to the `children` by users directly.
