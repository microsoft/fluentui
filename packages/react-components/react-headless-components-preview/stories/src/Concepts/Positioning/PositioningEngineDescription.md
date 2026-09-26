By default headless surfaces are positioned by the browser with native CSS anchor positioning: no JavaScript positioner runs. A **positioning engine** swaps that for an imperative positioner, per surface or app-wide.

```tsx
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';
import { PositioningEngineProvider } from '@fluentui/react-headless-components-preview/positioning';

// one surface
<Popover positioning={{ autoSize: true, engine: floatingUIPositioningEngine }} />;

// every surface below the provider (a component-level `engine` still wins)
<PositioningEngineProvider value={floatingUIPositioningEngine}>
  <App />
</PositioningEngineProvider>;
```

### When you need one

Every option of the canonical `positioning` contract is accepted, but these have no CSS equivalent and only take effect with an engine: `autoSize`, `flipBoundary`, `overflowBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget`, `arrowPadding`, `useTransform`, `disableUpdateOnResize`, `onPositioningEnd`. Passing them without an engine logs a development warning and does nothing.

`floatingUIPositioningEngine` is the Floating UI implementation that powers Fluent UI React v9, so a headless app that imports it gets full v9 parity; the `Engine…` stories below reproduce the corresponding v9 positioning examples. `@floating-ui/*` is only bundled if you import the engine; the headless package's bundle-isolation check forbids it.

### What an engine is

```ts
interface PositioningEngine {
  create(params: {
    container: HTMLElement; // the surface
    target: HTMLElement | PositioningVirtualElement; // trigger, or a virtual element for context menus
    arrow: HTMLElement | null; // present when `withArrow`
    options: PositioningOptions; // props merged with component-derived options (submenu side, pointer target…)
    dir?: 'ltr' | 'rtl';
    targetDocument?: Document;
  }): { updatePosition(): void; dispose(): void };
}
```

`create()` is called from a layout effect once the elements exist and disposed when they change or unmount. It is a plain object, never a hook, so it can come from props or context and change identity freely. An engine **replaces** CSS anchor positioning entirely: it owns every option, including the ones CSS also supports, so two positioners never mix.

The engine keeps the container positioned (including releasing the UA top-layer `inset: 0; margin: auto` that `[popover]` and `dialog:modal` receive) and keeps the container's `data-placement` current with the resolved **logical** placement (`above-start`, `after-top`, …), so placement-keyed CSS and arrows work the same way as with CSS anchor positioning.
