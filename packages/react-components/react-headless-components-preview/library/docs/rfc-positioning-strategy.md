# RFC: Positioning strategy for headless components

---

Contributors: [@mainframev](https://github.com/mainframev)

Stakeholders: `@fluentui/react-headless-components-preview` maintainers, `@fluentui/react-positioning` maintainers, headless component consumers

## Summary

Headless components (`Popover`, `Menu`, `Tooltip`, ...) position their surfaces with CSS anchor positioning. That leaves two gaps: the geometry-dependent `positioning` options are not implemented, and browser versions without anchor support render surfaces unpositioned. This RFC compares six options (A, C–G; B was explored and discarded) for closing the gaps and proposes **Option E**, a small JavaScript fallback inside headless that follows the CSS anchor rules.

## Background

**The contract.** `@fluentui/react-positioning` (v9) positions with floating-ui and exposes `PositioningProps`. The headless package reuses that contract but implements it with CSS (`anchor-name`, `position-anchor`, `position-area`, `position-try-fallbacks`).

- CSS covers: `position`, `align`, `offset`, `coverTarget`, `matchTargetSize`, `pinned`, `fallbackPositions`, `strategy`, `target` with a DOM element.
- CSS cannot cover, because they need measured geometry: `autoSize`, `flipBoundary`, `overflowBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget`, `arrowPadding`, `useTransform`, `disableUpdateOnResize`, `onPositioningEnd`, function-form `offset`. These are ignored today.
- Virtual targets (`target` / `positioningRef.setTarget` with an object that has `getBoundingClientRect`) also need JavaScript, because `anchor-name` must be set on an element. Today the CSS path silently anchors to the trigger instead, so a `Menu` with `openOnContext` opens at the trigger, not at the pointer.

**Browser support.** [CSS Anchor Positioning Module Level 1](https://drafts.csswg.org/css-anchor-position-1/) is Baseline newly available (2026): Chromium 125, Safari 26, Firefox 147. Headless uses `position-area`, which Chromium supports from 129 (125–128 shipped it as `inset-area`), so the effective minimum is Chromium 129, Safari 26, Firefox 147. Feature detection therefore tests `position-area`, not `anchor-name`. In older browser versions only placement breaks: the surface still opens, closes, moves focus, dismisses and keeps its accessibility semantics, but appears at its default position.

**The cost of the v9 engine.** `usePositioning` from `react-positioning` always includes every middleware (offset, flip, shift, maxSize, coverTarget, matchTargetSize, arrow, hide, intersecting). Measured with the package's monosize fixture (`yarn nx run react-positioning:bundle-size`, production webpack, React external):

| What                                                                                          | Minified | Gzip    |
| --------------------------------------------------------------------------------------------- | -------- | ------- |
| `usePositioning` (Fluent manager + all middlewares + `@floating-ui/dom`)                      | 29.2 kB  | 10.3 kB |
| of which `@floating-ui/dom` (includes `@floating-ui/core`)                                    | 21.0 kB  | 8.2 kB  |
| remainder: Fluent wrappers, `createPositionManager`, options resolution                       | ~8 kB    | ~2 kB   |
| `floatingUIPositioningEngine` from [#36800](https://github.com/microsoft/fluentui/pull/36800) | 27.2 kB  | 9.8 kB  |

`@floating-ui/devtools` is compiled out of production. Each option below lists its own cost.

## Problem statement

Consumers of headless components need:

1. A surface positioned correctly in every supported browser.
2. The geometry-dependent options when their product needs them (`autoSize` and boundaries are used widely in Teams and Office).
3. Predictable cost: headless is meant to stay lightweight, so only pages that need a JavaScript engine should pay for one.

The library needs one rule for which code runs when, that can be documented and tested, and that does not fork behaviour between browsers in ways consumers cannot see.

## Options

A, C, D and E are strategies for headless. F and G change the engine inside `react-positioning`; they make A and C cheaper but do not position a headless surface on their own.

### Option A: Explicit engine ([#36800](https://github.com/microsoft/fluentui/pull/36800))

```tsx
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';

<Popover positioning={{ position: 'below', autoSize: true, engine: floatingUIPositioningEngine }} />;

<PositioningEngineProvider value={floatingUIPositioningEngine}>
  <App />
</PositioningEngineProvider>;
```

CSS is the default. When an engine is passed, per surface or through the provider, it owns positioning entirely. Engine-only options without an engine are ignored with a dev warning.

**Cost:** 0 kB by default; 27.2 kB / 9.8 kB gzip where the consumer imports the engine.

Pros

- floating-ui ships only where the consumer imports it, in the consumer's own chunks.
- The engine path positions synchronously in a layout effect, so there is no unpositioned frame.
- Which path runs is visible in props, so it can be tested and documented.
- Full parity with `react-positioning` when an engine is set. `PositioningEngine` is an interface, so other engines are possible.

Cons

- Consumers must learn which options and browsers need an engine and wire it themselves.
- A browser without anchor support and no engine is unpositioned, with no warning.
- The safe choice, a provider at the app root, silently opts every surface out of native positioning. In an app built by many teams, the other teams get no signal.
- `engine`, `PositioningEngine` and the provider become public API, so retiring them once the platform catches up is a breaking change.
- Migrating from v9 means adding an engine wherever the product relies on engine-only options, virtual targets or older browsers.

### Option B: Automatic fallback, lazy-loaded ([#36124](https://github.com/microsoft/fluentui/pull/36124)) — discarded

Explored and dropped. The library decided at runtime and `import()`ed floating-ui only when needed. Lazy loading at library level means a cold-open flash while the chunk loads, and the consumer's bundler, not the library, decides how that chunk is split, so it can end up duplicated. Option C keeps the runtime decision without the lazy load.

### Option C: Automatic fallback, bundled

```ts
mode = CSS.supports('position-area: bottom') && !requiresFloatingUI(options) ? 'anchor' : 'floating';
```

`requiresFloatingUI` is true for any engine-only option or a virtual target. The library decides on mount; floating-ui is a static dependency of headless and only runs when `mode` is `'floating'`.

**Cost:** ~29 kB / ~10 kB gzip on every headless page.

Pros

- No flash and no extra request: the engine is already loaded when the surface opens.
- Nothing to configure, full parity on the first open, and the same API as v9.
- The fallback is internal, so it can be replaced without a breaking change.

Cons

- Every headless page pays for the full engine, including pages that only use CSS-eligible options in browsers with anchor support. That works against the lightweight goal.
- The path is invisible, and consumers cannot opt out of shipping floating-ui.
- Two implementations, CSS and floating-ui, with different flip and shift rules that must stay aligned.

### Option D: Extend CSS only

Keep CSS as the only path and add `autoSize` and the overflow/flip boundaries to it. Older browsers are left to the [`@oddbird/css-anchor-positioning`](https://github.com/oddbird/css-anchor-positioning) polyfill (already used by `@fluentui/web-components`), loaded by consumers who need them.

**Cost:** 0 kB; consumers that load the polyfill pay for it.

Pros

- No JavaScript engine, positioned on first paint, and the API is unchanged.

Cons

- The polyfill does not fit headless. Older browsers drop the inline `anchor-name` and `position-area` styles headless sets, so the polyfill never sees them. It does not support anchors added on mount, and its `position-area` differs from the native behaviour. It also depends on `@floating-ui/dom`.
- Parity stays partial; every added option is a second implementation to keep aligned with `react-positioning`.
- Open-ended maintenance while CSS anchor semantics are still moving.

### Option E: CSS-semantics JavaScript fallback inside headless ([#36841](https://github.com/microsoft/fluentui/pull/36841), Dmytro Kirpa, exploration)

CSS stays the primary path. When CSS cannot do the job, headless runs its own JavaScript fallback that recomputes what the browser would do with CSS. It contains no floating-ui code.

```ts
// evaluated once per mount
const [useAnchors] = React.useState(supportsAnchorPositioning); // anchor-name + position-area

const jsMode =
  !useAnchors ||
  (!!effectiveTarget && !('nodeType' in effectiveTarget)) || // virtual target
  PLUGINS.some(plugin => plugin.requiresJs?.(options)); // boundaries, function offset

const { targetRef, containerRef, arrowRef } = usePositioning({
  position: 'below',
  autoSize: true,
  overflowBoundary: scrollParent,
  arrowPadding: 8,
  onPositioningEnd: handlePositioned,
});
```

**What the fallback reproduces:** the `position-area` grid (extended when the anchor sticks out of its containing block), first-fit `position-try-fallbacks` (default `flip-block`, `flip-inline`, both), margin offsets, `anchor-center`, `coverTarget`, `matchTargetSize`, `absolute` and `fixed`, containing blocks created by positioned, transformed, filtered and scrolled ancestors, and RTL. It positions in a layout effect, before paint.

**Plugins** (a module constant, not public API) handle what CSS cannot express. Each plugin can force the JavaScript path, adjust the fallback's input, or run after every update on both paths: `offsetPlugin` (function `offset`), `boundaryPlugin` (`flipBoundary`, `overflowBoundary`, `overflowBoundaryPadding`), `autoSizePlugin`, `arrowPlugin` (`arrowPadding`, `arrowRef`) and `hidePlugin` (`data-positioning-hidden`, `data-positioning-escaped`, `onPositioningEnd`). Because plugins also run on the CSS path, `autoSize`, the arrow and the hidden state work in modern browsers too. One update loop (`scroll`, `resize`, `ResizeObserver`, debounced) serves both paths and writes the applied placement to `data-placement`.

**Types:** headless re-exports `PositioningProps` and the related types from `@fluentui/react-positioning`, and a compile-time test fails if they diverge. `useTransform` and `shiftToCoverTarget` are accepted but have no effect.

**Tests:** a Cypress spec renders the same hook on CSS and with support forced off, and compares the rects. It covers every position and alignment, RTL, viewport edges, `fallbackPositions`, `pinned`, `coverTarget`, `matchTargetSize`, five containing-block setups, the arrow, `autoSize`, the hidden state, and 300 random scenarios. A separate run of 11,500 random cases against Chrome 154 and Chromium 141 had under 0.5 % mismatches, all with anchors sticking out of the viewport. The reference is the browser, not floating-ui.

**Cost:** headless `usePositioning` grows from 6.05 kB to 15.9 kB minified, about 5 kB for the fallback and 4.5 kB for the plugins. These numbers come from an esbuild proxy in the PR description, not the monosize fixture, which is why there is no gzip figure yet. A page that uses both v9 components and headless pays for floating-ui and for this fallback.

Pros

- Older browsers and virtual targets work with no configuration, which also fixes the `openOnContext` menu.
- Both paths position before paint, with no flash.
- Near-full option coverage in every browser, including `autoSize`, boundaries, `arrowPadding`, function `offset`, `onPositioningEnd`, virtual targets, `enabled` and `disableUpdateOnResize`.
- No floating-ui in headless: about 10 kB for fallback and plugins against 25–29 kB for a floating-ui engine.
- Both paths follow one rule set, so flips, fallbacks and offsets agree between browsers, and the comparison spec checks it. C pairs CSS with floating-ui, whose flip and shift rules differ.
- Nothing is added that the library cannot take back. The public additions are `arrowRef`, `enabled` and the full `PositioningProps`; the fallback can shrink or disappear as browser support grows.

Cons

- Always bundled, so pages that only need CSS pay too. Smaller than C, but the same shape of cost.
- A third positioning implementation (CSS, the CSS mimic, floating-ui in v9) that has to track browser changes. Chrome 154 keeps boxes that overflow the viewport inside it and Chromium 141 does not; the fallback follows 154, and the comparison spec skips itself in Electron 130.
- Placement is close to, not identical with, v9. The size of that drift against v9 has not been measured yet; the under-0.5 % figure above compares the fallback with CSS, not with v9. An app that depends on exact v9 placement has no way to get it.
- `shiftToCoverTarget` and `useTransform` are silent no-ops.
- Which path ran is invisible. In RTL, `data-placement` is physical on the CSS path and logical on the JavaScript path, so styling by placement can differ.
- No runtime performance numbers for the fallback, and the visual regression and SSR suites have not been run.

### Option F: Inline a trimmed, synchronous Floating UI port in `react-positioning` ([#36839](https://github.com/microsoft/fluentui/pull/36839), Dmytro Kirpa, exploration)

`react-positioning` drops `@floating-ui/dom` and `@floating-ui/devtools` and vendors the parts it uses into `src/floating`, based on `@floating-ui/core@1.6.8`, `@floating-ui/dom@1.6.12` and `@floating-ui/utils@0.2.8` (MIT). Everything is synchronous. It keeps clipping ancestors, rect boundaries, CSS scale and transforms, iframes, shadow DOM, top layer and WebKit visual viewport handling. It drops `autoUpdate`, `autoPlacement`, `inline`, custom platforms and `rootBoundary`.

**Cost:** `usePositioning` goes from 29.2 kB / 10.3 kB gzip to 24.5 kB / 9.0 kB gzip. Another ~1–1.5 kB is available by dropping iframe, WebKit and top-layer support, which the PR does not do.

Pros

- About 4.7 kB minified / 1.2 kB gzip less for every `usePositioning` consumer, v9 components included, with no code changes. Headless entries that import utilities from `react-positioning` shrink by about 0.5 kB each.
- Synchronous: position is computed and applied in the same microtask, one microtask earlier than today.
- One third-party runtime dependency fewer, which simplifies native ESM and import-map setups.
- Identical to the current engine: a Cypress spec compares the old and new engines over 14 layouts, 5 middleware stacks, 12 placements, `absolute` and `fixed`, LTR and RTL, and all 70 cases match in `x`, `y`, placement and middleware data.
- The engine stays internal, so A and C work unchanged and cost less. G depends on it.

Cons

- Fluent owns about 1.6k lines of forked code. Upstream fixes have to be ported by hand, with the MIT attribution kept current.
- `autoUpdate`, `autoPlacement`, `inline`, custom platforms, `rootBoundary` and the devtools integration are gone, and consumers cannot add them back.
- Does nothing for headless by itself.
- Visual regression and SSR suites have not been run.

### Option G: Modular engine with plugins ([#36840](https://github.com/microsoft/fluentui/pull/36840), Dmytro Kirpa, exploration, builds on F)

`react-positioning` adds a `@fluentui/react-positioning/modular` entry with `usePositioningCore(options, plugins)`. An option is honoured only when its plugin is passed; with no plugins the element is placed next to the target with no collision handling. `usePositioning()` becomes `usePositioningCore(options, defaultPositioningPlugins)`, and a test checks the middleware order is unchanged.

```tsx
import {
  usePositioningCore,
  offsetPlugin,
  flipPlugin,
  shiftPlugin,
  arrowPlugin,
} from '@fluentui/react-positioning/modular';

// must be a module-level constant (a dev warning fires when the identity changes)
const plugins = [offsetPlugin, flipPlugin, shiftPlugin, arrowPlugin];

const { targetRef, containerRef, arrowRef } = usePositioningCore({ position: 'below', offset: 4 }, plugins);
```

Plugins: `offsetPlugin`, `flipPlugin` (`pinned`, `fallbackPositions`, `flipBoundary`), `shiftPlugin` (`overflowBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget`, `unstable_disableTether`), `arrowPlugin`, `autoSizePlugin`, `matchTargetSizePlugin`, `coverTargetPlugin`, `hidePlugin`, `intersectingPlugin`. `POSITIONING_PLUGIN_ORDER` publishes the slots so custom plugins can be mixed in. No Fluent component is migrated in the PR.

**Cost:** `usePositioningCore` is 12.6 kB / 4.9 kB gzip with no plugins, 21.3 kB / 8.0 kB gzip with offset, flip, shift and arrow, and 25.2 kB / 9.2 kB gzip with every plugin. `usePositioning()` grows by about 0.7 kB over F alone.

Pros

- Engine cost scales with the options used.
- An explicit table maps each option to the plugin that implements it, the same for headless and v9, instead of a `requiresFloatingUI` heuristic.
- Custom plugins can join the middleware stack.
- `usePositioning()` with the default plugins behaves exactly as before. Composes with A and C.

Cons

- A second hook, nine plugins, the order slots and the plugin types become public API of `react-positioning`.
- The saving only appears for consumers that switch to a subset. No Fluent component does yet, and `usePositioning()` itself grows.
- An option whose plugin is not passed is ignored without a warning, the same gap as A without an engine.
- An inline `plugins` array recreates the position manager on every render, with only a dev warning.
- Needs F first. Visual regression and SSR suites have not been run.

## Platform gaps

Part of this work is to push the remaining needs into CSS, so the JavaScript path is needed less over time.

| Option                                                        | Platform status                                                                                                                                                                                          |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoSize`                                                    | Likely possible with Level 1: with `position-area`, `max-block-size` / `max-inline-size` can be capped to the chosen area. Not yet verified against `react-positioning`.                                 |
| Shifting into view (`shiftToCoverTarget`, default shift)      | Partial in Level 1: default alignment keeps the box within its original containing block. No equivalent of `shiftToCoverTarget`.                                                                         |
| `overflowBoundary`, `flipBoundary`, `overflowBoundaryPadding` | No proposal. Fallbacks are tested against the containing block; a custom boundary or padding cannot be named.                                                                                            |
| Virtual targets                                               | No proposal. An anchor must be an element with `anchor-name`; coordinates such as the pointer position cannot be anchors.                                                                                |
| Arrow placement, styling by applied fallback                  | [Level 2](https://drafts.csswg.org/css-anchor-position-2/) anchored container queries (`container-type: anchored`, `@container anchored(fallback: …)`) style by the applied fallback. No `arrowPadding`. |
| `onPositioningEnd`, function-form `offset`                    | Script hooks; outside the scope of CSS.                                                                                                                                                                  |

Follow-up: raise CSSWG issues for custom overflow boundaries and non-element anchors, the two gaps with no spec work and the main reasons consumers need an engine.

## Comparison

F and G are engine changes that compose with A or C, so cells about headless browser behaviour read "n/a".

| Criterion                      | A: Explicit engine     | C: Auto, bundled | D: Extend CSS     | E: CSS mimic                      | F: Inlined port | G: Modular engine            |
| ------------------------------ | ---------------------- | ---------------- | ----------------- | --------------------------------- | --------------- | ---------------------------- |
| Added to headless bundle       | 0; 27.2 kB if imported | ~29 kB, always   | 0                 | ~10 kB, always (no floating-ui)   | 24.5 kB engine  | 12.6–25.2 kB engine          |
| Browser without anchor support | Consumer adds engine   | Handled          | Polyfill          | Handled                           | n/a             | n/a                          |
| Which path runs is visible     | Yes                    | No               | Yes               | No                                | n/a             | n/a                          |
| New public API                 | `engine`, provider     | None             | None              | `arrowRef`, `enabled`, full props | None            | Hook, 9 plugins, order slots |
| Parity with v9                 | Full with engine       | Full             | Partial           | Near-full, placement close        | Identical       | Identical with default set   |
| Maintenance                    | Two paths              | Two paths        | Growing CSS layer | Three implementations             | Owned fork      | Owned fork + plugin layer    |
| Consumer effort                | Opt in where needed    | None             | Load polyfill     | None                              | None            | Choose plugins               |
| Can change without breaking    | No                     | Yes              | Yes               | Yes                               | Yes             | No                           |

## Proposal

Adopt **Option E** ([#36841](https://github.com/microsoft/fluentui/pull/36841)): CSS anchor positioning stays the primary path, and headless ships its own JavaScript fallback that follows the CSS rules. No floating-ui, no provider, no engine option.

- Every surface is positioned in every supported browser by default. A and D leave older browsers unpositioned until the consumer acts.
- The cost is about 10 kB, against 25–29 kB for a floating-ui engine (C).
- Both paths follow one rule set, with the browser as the reference. C pairs CSS with floating-ui and forks behaviour between paths.
- The fallback and plugins are internal, so they can shrink or be removed as the platform covers more of the contract.

Known limits: placement is close to, not identical with, v9; `shiftToCoverTarget` and `useTransform` have no effect; the library owns a reimplementation of CSS anchor semantics that must track browser changes; and a page with both v9 and headless pays for both engines.

Option F is independent of this decision and is recommended for `react-positioning` on its own merits. Option G is deferred until a consumer of a plugin subset exists.

### Open questions

- Port E's engine to v9 `react-positioning`, so a page with both pays for one engine. That depends on the drift against v9 being acceptable.
- Offer an opt-in exact-v9 engine (where F or G would fit) if migration feedback asks for it.

### Required verification before this ships

The exploration passes unit tests, the Electron e2e suite on the CSS path, and the comparison spec on Chrome 154. These must also pass in CI:

- **Older browsers:** `Popover`, `Menu`, `Tooltip`, `Combobox`, `TagPicker` and `TeachingPopover` e2e with anchor support forced off, and in a real browser without it (Chromium < 129, Safari < 26, Firefox < 147).
- **Browser matrix:** the comparison spec on current Chrome, Safari and Firefox, with the Chrome 154 / Chromium 141 viewport-overflow difference resolved into one documented behaviour.
- **Iframes and shadow DOM:** a surface inside an iframe (Office add-in layout) and inside a shadow root, on both paths.
- **Scroll, resize and `enabled`:** scrolling ancestors, window resize, `disableUpdateOnResize`, zero-size `ResizeObserver` entries (`display: none`), and toggling `enabled` while open.
- **Drift against v9:** geometry options (`autoSize`, boundaries, function `offset`, `arrowPadding`, hidden and escaped attributes, `onPositioningEnd`) compared against `react-positioning` for the same inputs, reported as how far and in which cases surfaces move.
- **Virtual targets:** `target` and `setTarget` with a `getBoundingClientRect` object, including an update after the pointer moves.
- **RTL:** `data-placement` reported the same way on both paths.
- **Runtime performance:** the fallback's update loop compared with floating-ui on scroll and resize.
- **Visual regression and SSR:** VR on both paths; SSR confirms detection and the layout effect do not run on the server.
- **Bundle size:** the new `usePositioning` measured by the monosize bot, with gzip, and recorded here.
