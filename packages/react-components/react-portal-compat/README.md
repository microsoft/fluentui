# @fluentui/react-portal-compat

Compat layer for [React Portals](https://reactjs.org/docs/portals.html) between `@fluentui/react-components` & `@fluentui/react` or `@fluentui/react-northstar`.

With `PortalCompatProvider` components from `@fluentui/react-components` can be rendered properly in Portals created by `@fluentui/react` or `@fluentui/react-northstar`.

### Installation

```sh
yarn add @fluentui/react-portal-compat
```

### Usage

`PortalCompatProvider` should be an inner child of `FluentProvider`, no additional configuration is required for `@fluentui/react` or `@fluentui/react-northstar`.

```jsx
import { FluentProvider } from '@fluentui/react-components';
import { PortalCompatProvider } from '@fluentui/react-portal-compat';

function App() {
  return (
    <FluentProvider>
      <PortalCompatProvider>{/* your components */}</PortalCompatProvider>
    </FluentProvider>
  );
}
```
