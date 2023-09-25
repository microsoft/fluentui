# @fluentui/react-portal-compat-context

This package contains the React Context for compat layer in `@fluentui/react-portal-compat`.

### Installation

```sh
yarn add @fluentui/react-portal-compat-context
```

### Usage

> **Note:** These APIs are intended to be used by library developers, please use `@fluentui/react-portal-compat` if you need Portal compatibility.
>
> `PortalCompatContextProvider` and `usePortalCompat()` are exported APIs for implementing compat layer.

```tsx
import { PortalCompatContextProvider, usePortalCompat } from '@fluentui/react-portal-compat-context';

function Consumer() {
  const registerEl = usePortalCompat();

  React.useEffect(() => {
    const portalEl = document.createElement('div');

    return registerEl(portalEl);
  }, [registerEl]);

  return null;
}

function App() {
  const registerEl = React.useCallback((portalEl: HTMLElement) => {
    // do something...
    console.log(portalEl);

    return () => {
      // do something for cleanups...
    };
  }, []);

  return (
    <PortalCompatContextProvider value={registerEl}>
      <Consumer />
    </PortalCompatContextProvider>
  );
}
```
