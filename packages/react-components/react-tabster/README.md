# @fluentui/react-tabster

**Tabster components for [Fluent UI React](https://react.fluentui.dev)**

Library for focus management that leverages [tabster](https://github.com/microsoft/tabster).

The API currently only supports declarative data-\* attributes that are returned using the exported react hooks:

```tsx
import * as React from 'react';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';

const Item: React.FC = ({ children }) => <div tabIndex={0}>Item</div>;

const ArrowNavigationExample: React.FC = ({ children }) => {
  const attrs = useArrowNavigationGroup({ circular: true });

  return (
    <div {...attrs}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

const App: React.FC = () => {
  return <ArrowNavigationExample />;
};
```

## DOM-only focus tests

The repository's patched Tabster dependency supports an explicit
`visibilityMode: 'non-layout'` for focus-discovery tests in DOM environments
without layout, such as JSDOM. Initialize it before mounting `FluentProvider`:

```ts
import { createTabster, disposeTabster } from 'tabster';

const view = testContainer.ownerDocument.defaultView;
if (!view) {
  throw new Error('The focus test requires a DOM window.');
}

const tabster = createTabster(view, {
  autoRoot: {},
  controlTab: false,
  visibilityMode: 'non-layout',
});

// Mount and exercise the component, then unmount it before disposing Tabster.
disposeTabster(tabster);
```

The mode is fixed by the window's first Tabster instance. Later calls without a
mode reuse that policy; explicitly requesting a conflicting mode throws.
Dispose all instances between tests that use different policies.

Non-layout discovery rejects disconnected elements, CSS-hidden elements and
ancestors with `display: none` or hidden contents. Normal disabled, ARIA-hidden
and modal filtering still applies. It does not synthesize layout or establish
browser-equivalent visibility, keyboard navigation, or screen-reader behavior.
Use browser component tests for geometry-dependent cases, including hidden
iframes and layout-dependent rendering such as closed disclosure widgets.

The default remains the layout-aware browser policy. This option is supplied
by the local Yarn patch, not the unmodified published Tabster package.
