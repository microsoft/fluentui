# RFC: Provider style overrides

@ling1726

## Summary

Proposes two methods of overriding the default styles on the `FluentProvider`.

## Problem statement

The `FluentProvider` ships with [default styles](https://github.com/microsoft/fluentui/blob/656f002f3062c0a7962fb23eb165dec64ecc1509/packages/react-components/react-provider/src/components/FluentProvider/useFluentProviderStyles.ts#L11-L18) which can be too opinionated for some customers, especially those who have
strict requirements on global styles in their application.

If the FluentProvider is styled using a `makeStyles` call to override these default styles, it can result in unexpected issues since styles will not be RTL safe by default. See the example below:

```tsx
import { makeStyles } from '@fluentui/react-components';

const useProviderOverrides = makeStyles({
  provider: {
    // ⚠️ requires marginRight RTL style
    marginLeft: '1px',
  },
});

const App = () => {
  const styles = useProviderOverrides();
  return <FluentProvider className={styles.provider}>{children}</FluentProvider>;
};
```

`FluentProvider` renders internally `TextDirectionProvider` (from `@griffel/react`). The `TextDirectionProvider` is required to let `makeStyles` know to when to return RTL classes.

In the example above `makeStyles` is called _outside_ `FluentProvider` (and `TextDirectionProvider`) thus will have a wrong value for text direction. This problem is not specific to Fluent UI React and can be faced in other React applications.

While it is possible to override these styles using global CSS in a stylesheet by targeting the provider, that would
not handle portals which use the same default styles as the closest `FluentProvider` ancestor.

## Detailed Design or Proposal

### Specific API for overriding provider styles

The `FluentProvider` internally suffers from the same problem. This is solved by using `@griffel/core` so that
the text direction and renderer that are created internally in the component can be used directly with a
vanilla `makeStyles` call. [This is how the default provider styles are applied](https://github.com/microsoft/fluentui/blob/656f002f3062c0a7962fb23eb165dec64ecc1509/packages/react-components/react-provider/src/components/FluentProvider/useFluentProviderStyles.ts#L23).

We can extend this method to customers by creating a new API `makeProviderStyles` which would leverage `@griffel/core`
internally. `makeProviderStyles` would return a `makeStyles` factory that should be passed to the `FluentProvider`
and applied in the same way as the default provider styles.

```ts
// makeProviderStyles.ts

import { makeStyles, GriffelStyle } from '@griffel/core';

const makeProviderStyles = (providerStyles: GriffelStyle) => {
  return makeStyles({
    providerStyles,
  });
};
```

By leveraging `makeProviderStyles` the consuming app can override its styles without needing to know much else
about how the `FluentProvider` or Griffel work internally.

```tsx
// App.tsx
import { makeProviderStyles } from '@fluentui/react-components';

const providerStyles = makeProviderStyles({
  marginLeft: '1px',
});

const App = () => {
  return <FluentProvider styles={providerStyles}>{children}</FluentProvider>;
};
```

Additionaly in the `FluentProvider` we will strip and classnames that are known to be created by a standard `makeStyles`
call and trigger a warning. This will ensure that there is only **correct** way of overriding the provider styles.

#### Pros and Cons

- 👍 Add styles the same way as the `FluentProvider` currently does it
- 👍 No need to know about provider internals
- 👍 One time thing to do for `FluentProvider` only if really necessary

- 👎 Slightly different API to `makeStyles`
- 👎 `className` prop will be still exposed so users would be still able to pass classes from `makeStyles()` call
- 👎 Something 'special' to do for one component i.e. one time API
- 👎 Additional handling for build time transforms

## Discarded Solutions

### Document usage of extra providers

We can document how to override `FluentProvider` styles using the required extra providers so that the
default provider styles can be overriden.

```tsx
import { makeStyles, RendererProvider, TextDirectionProvider } from '@fluentui/react-components';

const useProviderOverrides = makeStyles({
  provider: {
    marginLeft: '1px',
  },
});

const App = ({ dir }) => {
  const styles = useProviderOverrides();
  return (
    <FluentProvider dir={dir} className={styles.provider}>
      {children}
    </FluentProvider>
  );
};

const AppWrapper = () => {
  return (
    <TextDirectionProvider dir="rtl">
      <App dir="rtl" />
    </TextDirectionProvider>
  );
};
```

#### Pros and Cons

- 👍 No extra code changes necessary
- 👍 Users will understand what the problem is
- 👍 API Consistency (The same pattern must be adopted if user wants their own renderer with RendererProvider)

- 👎 Extra effort to override one single component
- 👍/👎 `TextDirectionProvider` should be re-exported

## Open Issues

[#23821](https://github.com/microsoft/fluentui/issues/23821)
