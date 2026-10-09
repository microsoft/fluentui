# @fluentui/react-positioning

A React utilities built on top of an inlined, trimmed-down port of [Floating UI](https://floating-ui.com/) (see `src/floating`) for positioning elements in the DOM.

## Usage

```tsx
import * as React from 'react';
import { usePositiniong } from '@fluentui/react-positioning';

const PopupExample: React.FC = ({ children }) => {
  const { targetRef, containerRef } = usePositiniong();
  const [open, setOpen] = React.useState(false);

  const onClick = () => setOpen(s => !s);
  return (
    <>
      <button ref={targetRef} onClick={onClick}>
        Toggle popup
      </button>
      {open && <div ref={containerRef}>{children}</div>}
    </>
  );
};
```

## Modular usage

`usePositioning()` includes every positioning feature (flip, shift, auto size, arrow, ...). To only pay for what a component needs,
use `usePositioningCore()` from `@fluentui/react-positioning/modular` and pass the plugins that implement the options you use:

```tsx
import {
  usePositioningCore,
  offsetPlugin,
  flipPlugin,
  shiftPlugin,
  arrowPlugin,
} from '@fluentui/react-positioning/modular';

// Must be a stable reference, i.e. a module level constant
const plugins = [offsetPlugin, flipPlugin, shiftPlugin, arrowPlugin];

const Example = () => {
  const { targetRef, containerRef, arrowRef } = usePositioningCore({ position: 'below', offset: 4 }, plugins);
  // ...
};
```

Options are the same as for `usePositioning()`, but an option is only honored when its plugin is provided, for example `autoSize` is ignored
without `autoSizePlugin`. Without plugins the element is placed next to the target without any collision handling.

| Plugin                  | Options / behavior                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| `offsetPlugin`          | `offset`                                                                                      |
| `flipPlugin`            | `pinned`, `fallbackPositions`, `flipBoundary`                                                 |
| `shiftPlugin`           | `overflowBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget`, `unstable_disableTether` |
| `arrowPlugin`           | `arrowPadding`, positions the element attached to `arrowRef`                                  |
| `autoSizePlugin`        | `autoSize`                                                                                    |
| `matchTargetSizePlugin` | `matchTargetSize`                                                                             |
| `coverTargetPlugin`     | `coverTarget`                                                                                 |
| `hidePlugin`            | `data-positioning-hidden` and `data-positioning-escaped` attributes                           |
| `intersectingPlugin`    | `data-positioning-intersecting` attribute                                                     |

`defaultPositioningPlugins` contains all of them, `usePositioningCore(options, defaultPositioningPlugins)` behaves like `usePositioning(options)`.

Custom plugins are functions that receive the `container`, `arrow`, `options` and `isRtl` and return a middleware with an `order`.
Middleware run in ascending `order`, see `POSITIONING_PLUGIN_ORDER` for the slots used by the built-in plugins.
