By default headless surfaces are positioned with native CSS anchor positioning, which ships no JavaScript positioner. Some options of the canonical `positioning` contract cannot be expressed in CSS: `autoSize`, `flipBoundary`, `overflowBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget`, `arrowPadding`, `useTransform`, `disableUpdateOnResize` and `onPositioningEnd`. Passing them without an engine logs a development warning and has no effect.

To use them, supply a **positioning engine**. `@fluentui/react-positioning` exports `floatingUIPositioningEngine`, the Floating UI implementation that powers Fluent UI React v9, so a headless app gets full feature parity by importing it explicitly:

```tsx
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';

// one surface
<Menu positioning={{ autoSize: true, engine: floatingUIPositioningEngine }} />;

// every surface below the provider
<PositioningEngineProvider value={floatingUIPositioningEngine}>
  <App />
</PositioningEngineProvider>;
```

An engine **replaces** CSS anchor positioning for the surface — it owns every option, including the ones CSS also supports — so there is never a mix of two positioners. A component-level `engine` wins over the provider. Component-derived options (a submenu's `after`/`top` placement, a context menu's pointer target) are merged before the engine is invoked, so nothing needs restating at the call site.

An engine is a plain object with a `create()` method invoked from a layout effect; it is never called as a hook, so it can come from props or context and change at any time. `@floating-ui/*` is not bundled unless you import the engine: the headless package's bundle-isolation check forbids it.
