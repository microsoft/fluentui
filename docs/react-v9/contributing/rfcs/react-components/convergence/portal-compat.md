# RFC: Portal compatibility

[@layershifter](https://github.com/layershifter)

## Summary

This RFC proposes compatibility measures between components in different Fluent UI versions that use [`ReactDOM.createPortal()`](https://reactjs.org/docs/portals.html) via:

- usage of same values for `z-index`
- usage of separate React context to assign CSS class that handles CSS variables from Fluent UI React v9

## Problem statement

Once components from Fluent UI React v9 (`@fluentui/react-components`) are put inside popovers & dialogs from Fluent UI React v8 (`@fluentui/react`) or Fluent UI React v0 (`@fluentui/react-northstar`) they don't have proper styles 💥

Examples are below:

- v8 & v9: https://codesandbox.io/s/v8-v9-no-compat-2nnt7
- v0 & v9: https://codesandbox.io/s/v0-v9-no-compat-vw9e2

Another problem is related to `z-index` values. Fluent UI React v8 (`@fluentui/react`) defines values that win over everything:

```tsx
export namespace ZIndexes {
  export const Nav: number = 1;
  /**
   * @deprecated Do not use
   */
  export const ScrollablePane: number = 1;
  export const FocusStyle: number = 1;
  export const Coachmark: number = 1000;
  export const Layer: number = 1000000;
  export const KeytipLayer: number = 1000001;
}
```

> Check [style-utilities/src/styles/zIndexes.ts](https://github.com/microsoft/fluentui/blob/36df8cdbdc8dd4b5989685f89b7d339ee5774bf7/packages/style-utilities/src/styles/zIndexes.ts#L1-L11)

As v9 does not use such values components that use portals (`Popover`, `Menu`, `Tooltip`) appear **under** components from v8.

Demo: https://codesandbox.io/s/v8layer-v9popover-q33b37

## Detailed Design or Proposal

### Use same `z-index` values

- We can't change values in Fluent UI React v8 as this will be a breaking change
- We want to make our components visible

The simplest option that satisfies these requirements is to use same values in Fluent UI React v9.

#### Pros and Cons

- 👎 `z-index=1000000` is ugly
- 👍 it's predictable and works without any magic
- 👍 no breaking changes

### Introduce compat React Context

Introduce Pub/Sub context where:

- Publisher adds/modifies classes on passed elements
- Subscriber registers portal elements and does not know anything about implementation

In the prototype the publisher component is called `CompatHostV9`:

- it reads current classes from `useThemeClassName()`
- adds `fui-FluentProvider*` class to any portal element that was registered by subscribers

Functional prototype: https://codesandbox.io/s/portal-compat-prototype-f59rn

#### Changes to v0 & v8 code

`PortalInner` in `@fluentui/react-northstar` & `Layer` in `@fluentui/react` should:

- subscribe for new context
- register elements that are passed to `React.createPortal()` as `container`

Sample code is below:

```js
import React from 'react';

// "PortalCompatContext" & "usePortalCompat()" hook is everything that will be included to v8 & v0

export const PortalCompatContext = React.createContext(
  () => {},
  () => {},
);

export function usePortalCompat() {
  return React.useContext(PortalCompatContext);
}

function Portal() {
  // ⚠️ "document.createElement" is used for demo purposes
  //   This should be a real element where a portal will be mounted
  const portalElement = document.createElement('div');
  const [registerPortalEl, unregisterPortalEl] = usePortalCompat();

  React.useEffect(() => {
    registerPortalEl(portalElement);

    return () => {
      unregisterPortalEl(portalElement);
    };
  }, [portalElement, registerPortalEl, unregisterPortalEl]);
}
```

With these changes v0 & v8 portals will get proper classes with variables ➡️ styles for v9 components will look properly.

#### How this will be used?

Once changes to v0 & v8 will be implemented customers would be able to inject `CompatHostV9` (should be a child of `FluentProvider` from v9):

```tsx
<V9Provider>
  {/* 👇 Needs a better name */}
  <CompatHostV9>
    <V0Provider>{/* Components from v9 or v0... */}</V0Provider>
  </CompatHostV9>
</V9Provider>
```

As there might be customers that use only v9 it's reasonable to keep `CompatHostV9` separated from `V9Provider`.

#### Where "compat" package lives?

As this package will be a dependency of both v0 & v8 we will get it into the dependency graph:

```
                 -----------------------------------
                 | @fluentui/react-portal-compat@9 |
                 -----------------------------------
                      ▲                       ▲
                     /                         \
                    /                           \
                   /                             \
                  /                               \
                 /                                 \
                /                                   \
  ---------------------                        -------------------------------
  | @fluentui/react@8 |                        | @fluentui/react-northstar@0 |
  ---------------------                        -------------------------------

```

The suggestion is to keep it inside monorepo and put it into a new subdirectory `/packages/shared/` or `/packages/compat/`.

#### Pros and Cons

- 👎 (_out of scope?_) possible singleton issues due multiple versions that could be present in an app
- 👍 minimal bundle size impact to v0/v8
- 👍 completely optional for v9

#### Discarded Solutions

- Add a class with CSS variables to `body` (or non React data provider)
  - ❌ This breaks the idea of scoped theming
- Apply classes directly instead of Pub/Sub model (like `Portal` in v9 does):
  - ⚙️ We need to apply only classes currently. But this could change in the future, we can get additional requirements, for example: add additional data attributes. Suggested implementation allows extensibility

## Open Issues

N/A
