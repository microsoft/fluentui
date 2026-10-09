By default headless surfaces are positioned by the browser with native CSS anchor positioning: no JavaScript positioner runs. `PositioningProvider` switches the surfaces below it to Floating UI, the positioner that powers Fluent UI React v9, either where CSS is not enough or everywhere.

```tsx
import { PositioningProvider } from '@fluentui/react-headless-components-preview/positioning-floating-ui';

// recommended: CSS where it is enough, Floating UI where it is not
<PositioningProvider mode="fallback">
  <App />
</PositioningProvider>;

// Floating UI for every surface below
<PositioningProvider mode="floating-ui">
  <App />
</PositioningProvider>;

// back to CSS only for a subtree
<PositioningProvider mode="css">
  <Section />
</PositioningProvider>;
```

The nearest provider wins, so a nested provider overrides the mode for its subtree, down to a single surface. `@floating-ui/*` is only bundled by apps that import the `positioning-floating-ui` entry; the rest of the headless package never includes it.

### When you need it

Every option of the canonical `positioning` contract is accepted, but these have no CSS equivalent and only take effect under `PositioningProvider` (`fallback` or `floating-ui` mode): `autoSize`, `flipBoundary`, `overflowBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget`, `arrowPadding`, `useTransform`, `disableUpdateOnResize`, `onPositioningEnd`. Without it they log a development warning and do nothing. Browsers without CSS anchor positioning also need it, otherwise surfaces open unpositioned.

### `fallback` mode

Each surface keeps CSS anchor positioning and only hands over to Floating UI when

- the browser does not support `position-area` (Chromium before 129, Safari before 26, Firefox before 147), or
- it sets an option CSS cannot express: `autoSize`, `flipBoundary`, `overflowBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget`, `arrowPadding`, `onPositioningEnd`, or a function `offset`.

`useTransform` and `disableUpdateOnResize` only tune Floating UI, so they do not trigger the handover on their own. If the options change at runtime the surface switches between the two paths. One part of an app that needs `autoSize` therefore does not opt the rest of the app out of native anchoring.

### `floating-ui` mode

Every surface below is positioned by Floating UI, including those CSS could handle, so the two positioners never mix on a surface. Use it to match v9 behaviour exactly or to work around a browser issue with native anchoring; the `Engine…` stories below use it to reproduce the corresponding v9 positioning examples.

Floating UI keeps the container positioned (including releasing the UA top-layer `inset: 0; margin: auto` that `[popover]` and `dialog:modal` receive) and keeps the container's `data-placement` current with the resolved **logical** placement (`above-start`, `after-top`, …), so placement-keyed CSS and arrows work the same way as with CSS anchor positioning. When a surface switches back to CSS it restores the inline styles and attributes it wrote.

### Arrows

With `withArrow`, Floating UI positions the arrow along the surface edge (`arrowPadding` keeps it away from rounded corners), but headless components have no built-in arrow size, so the gap between the surface and the target is not adjusted for it. Set `offset` to at least the arrow's protruding size, e.g. `positioning={{ offset: 8 }}` for an 8px arrow.
