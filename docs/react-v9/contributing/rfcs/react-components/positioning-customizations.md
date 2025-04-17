# RFC: Shared positioning customizations

[@layeshifter](https://github.com/layershifter)

## Summary

This RFC proposes a new API for customizing positioning options for all components that use the `usePositioning()` hook. The API is based on React Context and allows overriding any positioning option for any component.

## Background

In Microsoft Teams, we have a requirement to enable `autoSize` (_and some other positioning options_) for certain components. Currently, we have a set of wrapper components that configure positioning options for the components they wrap:

```tsx
/* 💡 Simplified example */

import { Tooltip as BaseTooltip } from '@fluentui/react-components';

export const Tooltip = props => {
  const { positioning, ...rest } = props;
  // 💡 Always enable "autoSize" for Tooltip
  const modifiedPositioning = { ...positioning, autoSize: true };

  return <BaseTooltip {...rest} positioning={modifiedPositioning} />;
};
```

The problem with this approach is similar to the one we had with Custom Style Hooks: third-party packages will use the `Tooltip` directly from `@fluentui/react-components` and won't be able to use our wrapper with the pre-configured options.

This necessitates a solution utilizing React Context, so all components can consume the same settings.

## Detailed Design or Proposal

The proposal is to implement a React Context provider that will host a configuration function to tweak positioning options. In terms of API, it's similar to the Custom Style Hooks pattern.

```tsx
import {
  PositioningConfigurationProvider,
  type PositioningConfigurationFn,
  type PositionOptions,
} from '@fluentui/react-components';

// Default autoSize settings for specific component classes
const DEFAULT_AUTO_SIZE_OVERRIDE: Record<string, PositionOptions['autoSize']> = {
  'fui-PopoverSurface': true,
  'fui-Tooltip': 'width',
};

const configurePositioning: PositioningConfigurationFn = ({
  container /* The element being positioned */,
  arrow /* The arrow element, if present */,
  options /* User-provided options for this instance */,
}) => {
  // Note: a smarter check might be needed here
  const componentClassName = container.classList[0]; // e.g. "fui-PopoverSurface"

  // Determine the final `autoSize` value:
  // 1. Use the user's explicitly provided value if it exists.
  // 2. Otherwise, use the default override for this component class.
  // 3. Fallback to "undefined" if no user value or default override exists.
  const autoSize = options.autoSize ?? DEFAULT_AUTO_SIZE_OVERRIDE[componentClassName];
  // Example: Always use 'window' as the flip boundary unless overridden by the user
  const flipBoundary = options.flipBoundary ?? 'window';

  return {
    ...options, // Pass through original options
    // Apply the determined overrides/defaults
    autoSize,
    flipBoundary,
  };
};

function App() {
  return (
    <PositioningConfigurationProvider value={configurePositioning}>
      {/* Components within this provider will use the function */}
      {/* ... your application components ... */}
    </PositioningConfigurationProvider>
  );
}
```

This API allows overriding any positioning option for any element positioned via `usePositioning`. It also allows setting default values for options that are not specified by the user, or even overriding user-defined options based on custom logic within the function. The function will be called for every component instance that uses the `usePositioning()` hook.

> **Note: Components vs DOM elements**
>
> Unlike Custom Style Hooks, this API relies on DOM elements rather than component or hook names. This avoids leaking knowledge of the specific component name into the generic `usePositioning()` hook.
>
> ```ts
> /* ⚠️ Not the proposal */
> function usePopover() {
>   const {
>     /* ... */
>   } = usePositioning({
>     componentName: 'PopoverSurface',
>   });
> }
> ```
>
> While using component names looks like a viable option, it introduces a challenge for component composition. Consider `TeachingPopover`, which internally re-uses bits of `PopoverSurface`:
>
> ```tsx
> import { usePopoverSurface } from '@fluentui/react-components';
>
> function TeachingPopover() {
>   const state = usePopover();
>
>   // ...
> }
> ```
>
> Overriding the `componentName` in `usePopover()` is not possible with the current API design, making it difficult to customize positioning options specifically for `TeachingPopover`.
>
> Using the DOM approach avoids this issue by checking for class names directly:
>
> ```ts
> import { popoverSurfaceClassNames, teachingPopoverSurfaceClassNames } from '@fluentui/react-components';
>
> function getComponentOptions(element: HTMLElement) {
>   if (element.classList.contains(teachingPopoverSurfaceClassNames.root)) {
>     return { autoSize: true };
>   }
>
>   if (element.classList.contains(popoverSurfaceClassNames.root)) {
>     return { autoSize: 'height' };
>   }
>
>   return {};
> }
> ```

### Why prefer a function over a declarative object?

```tsx
/* ⚠️ Not the proposal */

function App() {
  return (
    <PositioningConfigurationProvider
      overrides={{
        // Global defaults
        autoSize: true,

        // Component-specific overrides
        components: {
          // How to map this key reliably? Class name?
          'fui-PopoverSurface': {
            autoSize: false,
          },
          'fui-Tooltip': {
            flipBoundary: 'window',
          },
        },
      }}
    >
      {/* ... your application components ... */}
    </PositioningConfigurationProvider>
  );
}
```

A purely declarative approach lacks the flexibility needed for certain use cases:

- **Conditional Overrides:** We might only want to override user-provided options under specific conditions. A declarative API typically merges or overrides statically, offering less control. With a function, we can inspect `options` and decide whether to apply defaults or keep the user's value.
- **Complex Logic:** Logic might be more involved than simple value setting. For example, setting `overflowBoundaryPadding` might depend on its value or on other options, a function can encapsulate this logic:

  ```ts
  import {
    PositioningConfigurationProvider,
    type PositioningConfigurationFn,
    type PositionOptions,
  } from '@fluentui/react-components';

  // A default offset from the top of the boundary
  const DEFAULT_TOP_OFFSET = 10;

  const positioningFn: PositioningConfigurationFn = ({ options }) => {
    // If the user provided a value, use it. Otherwise, use the default.
    const overflowBoundaryPadding =
      typeof options.overflowBoundaryPadding === 'number'
        ? options.overflowBoundaryPadding
        : {
            top: DEFAULT_TOP_OFFSET,
            ...(options.overflowBoundaryPadding ?? {}),
          };

    return {
      ...options,
      overflowBoundaryPadding,
    };
  };
  ```

## Open Issues

### Should this be a separate provider or a prop on `FluentProvider`?

Custom Style Hooks are exposed as a prop on `FluentProvider` (i.e., `customStyleHooks_unstable`). We could follow a similar pattern for positioning options:

```tsx
import { FluentProvider } from '@fluentui/react-components';

function App() {
  return <FluentProvider positioning={/* a function */}>{/* ... your application components ... */}</FluentProvider>;
}
```

The impact on bundle size would likely be negligible. However, adding more props directly to `FluentProvider` increases its API surface area, which ideally should remain as minimal as possible. A separate provider keeps concerns distinct.
