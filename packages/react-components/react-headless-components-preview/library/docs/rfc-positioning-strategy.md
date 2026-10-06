# RFC: Positioning strategy for headless components

---

Contributors: [@mainframev](https://github.com/mainframev)

Stakeholders: `@fluentui/react-headless-components-preview` maintainers, `@fluentui/react-positioning` maintainers, headless component consumers

## Summary

Headless components (`Popover`, `Menu`, `Tooltip`, ...) position their surfaces with CSS anchor positioning. That covers the `positioning` API only partially: the geometry-dependent options are not implemented, and older browser versions do not support CSS anchor positioning. Five PRs propose different ways to close the gap, or to make the gap cheaper to close:

- [#36800](https://github.com/microsoft/fluentui/pull/36800): the consumer passes a JavaScript engine explicitly (`positioning={{ engine }}` or `PositioningEngineProvider`).
- [#36124](https://github.com/microsoft/fluentui/pull/36124): the library decides at runtime and lazy-loads a floating-ui fallback when the browser or the requested options need it.
- [#36841](https://github.com/microsoft/fluentui/pull/36841) (Dmytro Kirpa, exploration): the headless hook ships its own small JavaScript fallback that follows the CSS anchor positioning rules, plus internal plugins for the options CSS cannot express. No floating-ui involved.
- [#36839](https://github.com/microsoft/fluentui/pull/36839) (Dmytro Kirpa, exploration): `react-positioning` replaces its `@floating-ui/dom` dependency with a trimmed, synchronous inlined port, so any option that ships the engine ships less.
- [#36840](https://github.com/microsoft/fluentui/pull/36840) (Dmytro Kirpa, exploration, builds on #36839): `react-positioning` gains a `/modular` entry with `usePositioningCore(options, plugins)`, so an engine consumer pays only for the plugins it passes.

This RFC compares seven options (explicit engine, automatic fallback with a lazy import, automatic fallback with floating-ui bundled, extend the CSS path, a CSS-semantics JavaScript fallback inside headless, an inlined synchronous Floating UI port, a modular engine with plugins) on bundle impact, browser behaviour, API complexity, parity with `react-positioning`, and maintenance cost, and recommends one.

## Background

`@fluentui/react-positioning` (v9) positions with floating-ui. It exposes `PositioningProps`: `position`, `align`, `offset`, `coverTarget`, `matchTargetSize`, `pinned`, `fallbackPositions`, `strategy`, `target`, `positioningRef`, plus geometry-dependent options `autoSize`, `flipBoundary`, `overflowBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget`, `arrowPadding`, `useTransform`, `disableUpdateOnResize`, `onPositioningEnd`, and function-form `offset`.

The headless package reuses `PositioningProps` as its contract but implements it with CSS anchor positioning (`anchor-name`, `position-anchor`, `position-area`, `position-try-fallbacks`). The CSS path handles the first group. The second group needs measured geometry (boundary rects, available space, final coordinates) that CSS does not expose to script, so those options are currently ignored (with a dev warning in #36800).

`target` and `positioningRef.setTarget` only work with DOM elements on the CSS path, because `anchor-name` has to be set on an element. A virtual target (an object with `getBoundingClientRect`, e.g. a context menu opened at the pointer) needs a JS engine even in browsers with anchor support. Today the CSS path ignores a virtual target without a warning and anchors to the trigger instead, so a `Menu` with `openOnContext` opens at the trigger rather than at the pointer.

`usePositioning` from `@fluentui/react-positioning` always includes the full middleware set (offset, flip, shift, maxSize, coverTarget, matchTargetSize, arrow, hide, intersecting) — there is no per-option tree-shaking of middlewares. Measured with the package's monosize fixture (`yarn nx run react-positioning:bundle-size`, production webpack, React external):

| What                                                                                          | Minified | Gzip    |
| --------------------------------------------------------------------------------------------- | -------- | ------- |
| `usePositioning` (Fluent manager + all middlewares + `@floating-ui/dom`)                      | 29.2 kB  | 10.3 kB |
| of which `@floating-ui/dom` (includes `@floating-ui/core`)                                    | 21.0 kB  | 8.2 kB  |
| remainder: Fluent wrappers, `createPositionManager`, options resolution                       | ~8 kB    | ~2 kB   |
| `floatingUIPositioningEngine` from [#36800](https://github.com/microsoft/fluentui/pull/36800) | 27.2 kB  | 9.8 kB  |

`@floating-ui/devtools` is compiled out of production. A page that already ships v9 positioning pays this once; a headless-only page pays it only if it imports the engine.

The exploration PRs change those numbers. The first three rows below come from the monosize bot on the PRs (same fixture setup as above); the last row is from the description of #36841, measured with an esbuild proxy and without gzip, so it is only indicative next to the fixture rows.

| What                                                                                                                            | Minified          | Gzip         |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------ |
| `usePositioning` with the inlined port from [#36839](https://github.com/microsoft/fluentui/pull/36839)                          | 24.5 kB           | 9.0 kB       |
| `usePositioningCore` from [#36840](https://github.com/microsoft/fluentui/pull/36840), no plugins                                | 12.6 kB           | 4.9 kB       |
| `usePositioningCore` + offset, flip, shift, arrow plugins                                                                       | 21.3 kB           | 8.0 kB       |
| headless `usePositioning` today → with the fallback and plugins from [#36841](https://github.com/microsoft/fluentui/pull/36841) | 6.05 kB → 15.9 kB | not reported |

Browser support: [CSS Anchor Positioning Module Level 1](https://drafts.csswg.org/css-anchor-position-1/) is Baseline newly available (2026) — Chromium 125, Safari 26, Firefox 147. The headless CSS path relies on `position-area`, which Chromium only supports from 129 (125–128 shipped it as `inset-area`), so the effective minimum is Chromium 129, Safari 26, Firefox 147. In older browser versions a headless surface today renders unpositioned. Only placement is affected: the surface still opens and closes, moves focus, dismisses on Escape and outside click, and keeps its accessibility semantics; it just appears at its default position instead of next to its trigger.

Feature detection has to test the properties the CSS path actually uses: `CSS.supports('anchor-name: --x')` is true in Chromium 125–128, where `position-area` is not supported, so the options below detect `position-area` instead.

## Problem statement

Consumers of headless components need:

1. A surface that is positioned correctly in every supported browser.
2. Access to the geometry-dependent options when their product needs them (`autoSize` and boundaries are used widely in Teams and Office).
3. Predictable cost: headless is meant to stay lightweight, so the JavaScript engine (~29 kB minified / ~10 kB gzip for `usePositioning` with all middlewares, of which ~21 kB / ~8 kB is `@floating-ui/dom`) should only be paid for by the pages that actually need it.

The library needs one rule for which code runs when, that is explainable in documentation, testable, and does not fork behaviour between browsers in ways consumers cannot see.

## Options

### Option A: Explicit engine selection (#36800)

```tsx
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';

// per surface
<Popover positioning={{ position: 'below', autoSize: true, engine: floatingUIPositioningEngine }} />;

// app-wide
<PositioningEngineProvider value={floatingUIPositioningEngine}>
  <App />
</PositioningEngineProvider>;
```

Default is CSS anchor positioning. If an engine is present it owns positioning entirely (including options CSS could handle). Engine-only options without an engine are ignored with a dev-time warning.

#### Pros

- Bundle: floating-ui is included only where the consumer imports the engine, statically, in the consumer's own chunking. No library-owned `import()`.
- Browser behaviour: the consumer decides when native CSS positioning is not enough for their product, whether because of the browsers they support or the options they need, and supplies an engine at the granularity that fits (app-wide through the provider, or per surface). With an engine the surface is positioned identically in every browser.
- First paint: the engine path positions synchronously in a layout effect, so there is no unpositioned frame. The CSS path positions on first paint.
- API: one new option (`engine`) and one provider. `PositioningEngine` is an interface, so an engine other than floating-ui is possible.
- Parity: full parity with `react-positioning` when the engine is set; a documented subset otherwise.
- Maintenance: two code paths in `usePositioning` (CSS, delegated). The engine implementation lives in `react-positioning`, where floating-ui already is.
- Predictability: which path runs is visible in props, so it can be reasoned about, tested and documented.

#### Cons

- Consumer effort: positioning becomes something they control manually. They have to read the documentation to learn which options need an engine and where native positioning falls short, and they have to configure it themselves.
- Silent gaps: a dev-time warning covers engine-only options without an engine, but nothing warns about a missing engine in a browser version without anchor support; the surface is simply unpositioned there.
- Over-correction risk: the simplest safe choice is to put the floating-ui engine in the provider for the whole app, which silently gives up native positioning (and its bundle and first-paint benefits) everywhere.
- Scale: the provider applies to its whole subtree. In an app built by many teams, one team that needs an engine-only option and adds the provider near the root opts every other surface out of native anchoring, and the teams below have no signal that it happened.
- Public commitment: `engine`, `PositioningEngine` and `PositioningEngineProvider` become consumer-facing API. Once consumers wire engines into their apps, deprecating or replacing them (for example when native anchor positioning covers enough browsers and options to make the engine unnecessary) is a breaking change, so the library no longer controls that decision.
- Migration: moving from v9 components means adding an engine wherever the product relies on engine-only options, virtual targets, or browser versions without anchor support; the `positioning` props alone no longer describe the behaviour.

### Option B: Automatic fallback (#36124)

```ts
mode = CSS.supports('position-area: bottom') && !requiresFloatingUI(options) ? 'anchor' : 'floating';
```

`requiresFloatingUI` is true for any engine-only option or a virtual target. The decision is made in a layout effect when the surface mounts. The floating-ui implementation sits behind a dynamic `import()` so it is only downloaded when that decision says so; the result is cached module-wide and reused by every surface. `preloadPositioning(options)` lets an app fetch it ahead of time.

#### Pros

- Bundle: floating-ui is not in the main bundle. Bundlers split the fallback into its own chunk(s) (~10 kB gzip for the helper plus `@floating-ui/dom`, matching the full `usePositioning` fixture), fetched on demand and shared by all surfaces.
- Browser behaviour: consumers write nothing browser-specific. Browsers with anchor support use CSS for eligible surfaces; the rest transparently take the fallback.
- API: nothing to configure; `preloadPositioning()` as an escape hatch.
- Parity: every `react-positioning` option works in every browser, once the chunk has loaded.
- Migration: the `positioning` API is the same as in `react-positioning`, with no new concepts, so moving from v9 components needs no positioning changes.
- Evolvability: the fallback is an implementation detail, not consumer API. The library can deprecate or replace it later (for example as browsers ship more of CSS anchor positioning) without a breaking change.

#### Cons

- Cold start: the fallback is fetched only after the library decides it is needed, and the surface is already shown while that happens, so the first open can flash unpositioned — a frame or two locally, seconds on a slow connection, two round trips if the helper and `@floating-ui/dom` are separate chunks. Warm opens and `preloadPositioning()` avoid it. When the download starts depends on whether the closed surface stays mounted (Menu starts at page load; Popover starts on first open), and browser versions without anchor support take this path for every surface, not only those with engine-only options. None of that is visible to the consumer.
- Predictability: consumers cannot tell which path a given user got, and cannot force one.
- Chunking: a library-owned `import()` is split by each consumer's bundler, not by the library. Depending on the app's chunking configuration and how many bundles include headless components, the fallback can be split differently than intended or duplicated across chunks, and the consumer has no direct way to control it.
- Maintenance: support detection, lazy loading, caching, cancellation on unmount, the preload API, and two implementations that must stay behaviourally aligned (placement names, arrow handling, `onPositioningEnd` semantics) all live in the library and need cross-browser and cross-bundler testing, including SSR.

### Option C: Automatic fallback, floating-ui bundled

Same runtime decision as Option B: CSS when the browser supports it and the options do not need a JS engine, floating-ui otherwise. The difference is there is no `import()`. Floating-ui is a static dependency of the headless package and is always in the bundle; `mode` only turns that engine on or off.

```ts
mode = CSS.supports('position-area: bottom') && !requiresFloatingUI(options) ? 'anchor' : 'floating';
```

#### Pros

- Bundle timing: no extra request, no `preloadPositioning()`, no mount-vs-unmount fetch policy. The engine is already in memory when the surface opens.
- First paint: the floating-ui path can position synchronously, like Option A. There is no cold-start flash.
- Browser behaviour: consumers write nothing browser-specific. Browsers with anchor support use CSS for eligible surfaces; the rest use the engine that already shipped.
- API: nothing to configure.
- Parity: every `react-positioning` option works in every browser on the first open.
- Migration and evolvability: same as Option B — the `positioning` API matches `react-positioning`, and the fallback stays an implementation detail the library can replace without a breaking change.
- Maintenance: simpler than B — no lazy loading, chunk caching, in-flight cancellation, or preload API. Still two implementations plus support detection.

#### Cons

- Bundle: every headless page pays the full engine (~29 kB minified / ~10 kB gzip for `usePositioning`, of which ~21 kB / ~8 kB is `@floating-ui/dom`), including pages that only ever use CSS-eligible options in browsers with anchor support. That undercuts the lightweight goal in the problem statement.
- Predictability: consumers cannot tell which path a given user got, and cannot force one or opt out of shipping floating-ui.
- Maintenance: two code paths still have to stay aligned; the unused engine is dead weight on the CSS path rather than a loading-state machine.

### Option D: Extend CSS-based positioning

Keep CSS as the only positioning path and add more of the option set there.

Today CSS covers placement (`position`, `align`, `offset`, `coverTarget`, `matchTargetSize`, `pinned`, `fallbackPositions`, `strategy`, and `target` with a DOM element). Geometry-dependent options and virtual targets are ignored: `autoSize`, `overflowBoundary`, `flipBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget`, `arrowPadding`, `onPositioningEnd`, function-form `offset`, and `target` / `setTarget` with a virtual element.

This option would add `autoSize` and overflow/flip boundaries (`overflowBoundary`, `flipBoundary`, `overflowBoundaryPadding`).

This option only addresses feature parity. Browser versions without anchor support are left to the [`@oddbird/css-anchor-positioning`](https://github.com/oddbird/css-anchor-positioning) polyfill (already used by `@fluentui/web-components`), which consumers load when they need those browsers.

#### Pros

- Bundle: nothing beyond the CSS path; only consumers that load the polyfill pay for it.
- API: unchanged; no new concepts for consumers.
- First paint: CSS positions on first paint, no loading step.

#### Cons

- Browser behaviour: relies on the polyfill for browser versions without anchor support, and the polyfill does not fit the headless CSS path as it is today. A browser without anchor support drops the `anchor-name` and `position-area` inline styles headless sets, so the polyfill never sees them; dynamically added or removed anchors and targets are not supported, while headless surfaces mount on open; and `position-area` support differs from native behaviour. It also depends on `@floating-ui/dom`, so it does not avoid the floating-ui cost.
- Parity: remaining options can be added as analogues of floating-ui. That is still a second implementation to keep aligned with `react-positioning`.
- Maintenance: high and open-ended; CSS anchor semantics are still moving.
- Risk: every extra option on the CSS path is another behaviour to keep aligned with `react-positioning` without sharing its engine, so consumers would still see a different positioning model rather than a clear "engine or not" boundary.

### Option E: CSS-semantics JavaScript fallback inside headless (#36841)

The headless `usePositioning` keeps CSS anchor positioning as the primary path and ships its own JavaScript fallback that re-implements the CSS rules rather than delegating to floating-ui. The decision is made per surface, in render:

```ts
// evaluated once per mount: CSS.supports('anchor-name: --a') && CSS.supports('position-area: top')
const [useAnchors] = React.useState(supportsAnchorPositioning);

const jsMode =
  !useAnchors ||
  (!!effectiveTarget && !('nodeType' in effectiveTarget)) || // virtual target
  PLUGINS.some(plugin => plugin.requiresJs?.(options)); // boundaries, function offset

// the hook takes the canonical PositioningProps plus `enabled`, and returns an arrow ref
const { targetRef, containerRef, arrowRef } = usePositioning({
  position: 'below',
  autoSize: true,
  overflowBoundary: scrollParent,
  arrowPadding: 8,
  onPositioningEnd: handlePositioned,
});
```

On the JavaScript path `computeFallbackPosition()` follows what the browser would do with CSS: the `position-area` grid (extended when the anchor sticks out of its containing block), first-fit `position-try-fallbacks` (default `flip-block`, `flip-inline`, both), margin offsets, `anchor-center`, `coverTarget`, `matchTargetSize`, `absolute` and `fixed`, containing blocks created by positioned, transformed, filtered and scrolled ancestors, and RTL. It positions in a layout effect, before paint.

Internal plugins handle the options CSS cannot express. A plugin can declare that an option forces the JavaScript path (`requiresJs`), adjust the input of the fallback (`prepare`), and run after every update on both paths (`apply`): `offsetPlugin` (function `offset`), `boundaryPlugin` (`flipBoundary`, `overflowBoundary`, `overflowBoundaryPadding`), `autoSizePlugin`, `arrowPlugin` (`arrowPadding`, `arrowRef`) and `hidePlugin` (`data-positioning-hidden`, `data-positioning-escaped`, `onPositioningEnd`). Because `apply` also runs on the CSS path, `autoSize`, the arrow and the hidden state work in browsers with anchor support too. The plugin list is a module constant, not consumer API. One update loop (capturing `scroll`, `resize`, a `ResizeObserver`, debounced) serves both paths and replaces the placement observer; on the CSS path the applied placement is detected from the rects and written to `data-placement`.

The headless package stops keeping its own narrower copy of the positioning types: `PositioningProps`, `PositioningShorthand`, `Position`, `Alignment`, `Offset`, `PositioningBoundary`, `PositioningVirtualElement` and the rest are re-exports from `@fluentui/react-positioning`, with a compile-time test that fails if they diverge. `useTransform` and `shiftToCoverTarget` are accepted but have no effect. Fallback and plugins are always bundled: `usePositioning` grows from 6.05 kB to 15.9 kB minified (about 5 kB for the fallback and 4.5 kB for the plugins).

The fallback is checked against the browser rather than against floating-ui: a Cypress spec renders the same hook twice, once on CSS and once with support forced off, and compares the rects for every position and alignment, RTL, viewport edges, custom `fallbackPositions`, `pinned`, `coverTarget`, `matchTargetSize`, five containing-block setups, arrow, `autoSize`, the hidden state, and 300 random scenarios. A separate run of 11,500 random cases against Chrome 154 and Chromium 141 had under 0.5 % mismatches, all with anchors sticking out of the viewport.

#### Pros

- Browser behaviour: browsers without anchor support and virtual targets are handled with no consumer configuration, which also fixes the `openOnContext` menu described in the background.
- First paint: both paths position before paint. There is no cold-open flash (unlike B) and no chunk to preload.
- Parity: near-full option coverage in every browser — `autoSize`, boundaries, `arrowPadding`, function `offset`, `onPositioningEnd`, hidden and escaped attributes, virtual targets, `enabled`, `disableUpdateOnResize`. The headless types are the canonical ones, so a drift between the packages is a compile error.
- Bundle: no floating-ui in the headless bundle at all. The engine plus plugins cost about 10 kB minified, against about 25–29 kB for `usePositioning` from `react-positioning` (see the bundle tables).
- Consistency between paths: the fallback follows the CSS rules, so flips, fallbacks and offsets agree between a browser with anchor support and one without, and the comparison spec checks that mechanically. Options B and C instead pair CSS with floating-ui, whose flip and shift rules differ from CSS.
- API: nothing new to configure. Public additions are `arrowRef`, `enabled`, and the fuller `PositioningProps`; the CSS path gains `autoSize`, arrow and hidden state today.
- Migration and evolvability: the `positioning` API matches `react-positioning`, so moving from v9 components needs no positioning changes. The fallback is an implementation detail that can be removed as browser support grows, without a breaking change.

#### Cons

- Bundle: every headless page pays the fallback and the plugins (6 kB → 16 kB minified), including pages that only ever use CSS-eligible options in browsers with anchor support. Smaller than C, but the same shape of cost.
- Maintenance: a third positioning implementation in the repository (CSS, a CSS-mimicking engine, floating-ui in v9), with its own containing-block, clipping and geometry code. CSS anchor semantics are still moving, so the mimic has to track browser changes: Chrome 154 keeps boxes that overflow the viewport inside it, Chromium 141 does not, and the fallback follows 154 (the comparison spec skips itself in Electron 130).
- Parity with v9: behaviour is "close to, not pixel identical with" the floating-ui-based `react-positioning`. A v9 → headless migration can move surfaces by a few pixels, and an app that depends on the exact v9 placement has no way to get it. `shiftToCoverTarget` and `useTransform` are silently no-ops.
- Predictability: which path a user got is invisible and cannot be forced (same as B and C). In RTL the CSS path reports `data-placement` start/end physically and the JavaScript path logically, so styling by placement can differ between paths.
- Verification: the visual regression suite and SSR tests were not run on the exploration.

### Option F: Inline a trimmed, synchronous Floating UI port in `react-positioning` (#36839)

Not a headless strategy on its own: it changes the price and the timing of the engine that Options A and C ship (and the provider in the proposal below). `@fluentui/react-positioning` drops `@floating-ui/dom` and `@floating-ui/devtools` and vendors the part of Floating UI it uses into `src/floating`:

```ts
/**
 * A trimmed-down, synchronous port of the parts of Floating UI that `@fluentui/react-positioning` uses.
 * Based on `@floating-ui/core@1.6.8`, `@floating-ui/dom@1.6.12` and `@floating-ui/utils@0.2.8` (MIT).
 *
 * Differences from upstream:
 * - everything is synchronous (there is no pluggable async platform)
 * - `autoUpdate`, `autoPlacement`, `inline`, custom platforms and `rootBoundary` are not included
 * - middleware options are plain objects (only `offset` accepts a function)
 */
export { computePosition } from './computePosition';
export { detectOverflow } from './detectOverflow';
export { arrow, flip, hide, limitShift, offset, shift, size } from './middleware';
```

Clipping ancestors, rect boundaries, CSS scale and transforms, iframes, shadow DOM, top layer and the WebKit visual viewport handling are kept. Because `computePosition` is synchronous, `createPositionManager` computes and applies the position in the same microtask instead of one microtask later, and errors are caught with `try/catch` instead of `.catch`. A Cypress parity spec runs the old `@floating-ui/dom` implementation and the port side by side over 14 layouts (scroll containers, scale and transforms, iframes, shadow DOM, top layer, virtual elements), 5 middleware stacks, 12 placements, `absolute` and `fixed`, LTR and RTL; all 70 cases are identical in `x`, `y`, placement and middleware data. `usePositioning` goes from 29.2 kB / 10.3 kB gzip to 24.5 kB / 9.0 kB gzip; about 1–1.5 kB more is available by dropping iframe, WebKit and top-layer support, which the PR does not do.

#### Pros

- Bundle: about 4.7 kB minified / 1.2 kB gzip less for every `usePositioning` consumer, v9 components included, without touching their code. Headless entries that import utilities from `react-positioning` shrink by about 0.5 kB each.
- First paint: synchronous positioning removes the one-microtask delay between mount and the first position.
- Dependencies: one third-party runtime dependency fewer, which also simplifies native ESM and import-map setups where `@floating-ui/dom` had to be mapped.
- Parity: identical to the current engine, verified by the side-by-side spec rather than assumed.
- Composability: the engine stays internal, so A, C and the provider proposal work unchanged and simply cost less. Prerequisite for Option G.

#### Cons

- Maintenance: Fluent owns about 1.6 k lines of forked positioning code. Upstream Floating UI fixes no longer arrive through a dependency bump; they have to be ported by hand, with the MIT attribution kept current.
- Lost features: `autoUpdate`, `autoPlacement`, `inline`, custom platforms and `rootBoundary` are gone and cannot be reintroduced by consumers; the `@floating-ui/devtools` integration is gone too.
- Headless: does nothing for headless by itself. Browsers without anchor support still render unpositioned unless A, C or E is adopted as well.
- Verification: the visual regression suite and SSR tests were not run on the exploration.

### Option G: Modular engine with plugins (#36840, builds on F)

`react-positioning` exposes a second entry, `@fluentui/react-positioning/modular`, with `usePositioningCore(options, plugins)`. A plugin is a function from `{ container, arrow, options, isRtl }` to a middleware with an `order`; an option is only honoured when its plugin is passed, and without plugins the element is placed next to the target with no collision handling.

```tsx
import {
  usePositioningCore,
  offsetPlugin,
  flipPlugin,
  shiftPlugin,
  arrowPlugin,
} from '@fluentui/react-positioning/modular';

// must be a stable reference, i.e. a module level constant (a dev warning fires when the identity changes)
const plugins = [offsetPlugin, flipPlugin, shiftPlugin, arrowPlugin];

const Example = () => {
  const { targetRef, containerRef, arrowRef } = usePositioningCore({ position: 'below', offset: 4 }, plugins);
  // ...
};
```

Built-in plugins and the options they own: `offsetPlugin` (`offset`), `flipPlugin` (`pinned`, `fallbackPositions`, `flipBoundary`), `shiftPlugin` (`overflowBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget`, `unstable_disableTether`), `arrowPlugin` (`arrowPadding`, the arrow element), `autoSizePlugin` (`autoSize`), `matchTargetSizePlugin`, `coverTargetPlugin`, `hidePlugin` (`data-positioning-hidden`, `data-positioning-escaped`) and `intersectingPlugin` (`data-positioning-intersecting`). `POSITIONING_PLUGIN_ORDER` publishes the slots the built-in plugins use so custom plugins can be mixed in. `usePositioning()` becomes `usePositioningCore(options, defaultPositioningPlugins)`, and a test checks that the middleware order is unchanged. No Fluent component is migrated in the PR.

For headless, the relevant use is an engine path (Option C, or the provider in the proposal) that ships only the plugins headless needs instead of the full set, and a documented plugin-to-option table of the kind Option E keeps internally. Measured with the bot: `usePositioningCore` is 12.6 kB / 4.9 kB gzip with no plugins, 21.3 kB / 8.0 kB gzip with offset, flip, shift and arrow, and 25.2 kB / 9.2 kB gzip with every plugin. `usePositioning()` itself is about 0.7 kB bigger than with Option F alone, for the plugin layer.

#### Pros

- Bundle: the engine cost scales with the options used, from 12.6 kB bare to 25.2 kB with everything, instead of always 25–29 kB.
- Predictability: per-option ownership is an explicit table (which plugin implements which option) instead of a `requiresFloatingUI` heuristic, and it is the same table whether the engine is used by headless or by a v9 component.
- Extensibility: custom plugins slot into the published order; the middleware stack is no longer closed.
- Parity: `usePositioning()` with the default plugins behaves exactly as before, verified by a test on the middleware order. Composes with A, C and the provider proposal.

#### Cons

- Public commitment: a second hook, nine plugins, the order slots and the plugin types become consumer-facing API of `react-positioning` to support and version.
- Realised savings: `usePositioning()` grows by about 0.7 kB, and the saving only materialises for consumers that move to `usePositioningCore` with a subset. No Fluent component does yet, and a headless engine path would need its own plugin subset to benefit.
- Silent gaps: an option whose plugin is not passed is ignored without a warning, the same class of gap as engine-only options without an engine in Option A.
- Footgun: the `plugins` array must keep a stable identity; an inline array recreates the position manager on every render, with only a dev-time warning.
- Sequencing: depends on Option F landing first. The visual regression suite and SSR tests were not run on the exploration.

## Platform gaps

Every option above exists because CSS anchor positioning does not yet cover the whole `PositioningProps` contract. Part of this work is to push the remaining needs into the platform, so the engine path is needed less over time. Status of the geometry-dependent options against the specs:

| Option                                                        | Platform status                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `autoSize`                                                    | Likely possible with Level 1: with `position-area` the inset-modified containing block is the chosen area, so `max-block-size` / `max-inline-size` can be capped to the available space. Not yet verified against `react-positioning` behaviour.                               |
| Shifting into view (`shiftToCoverTarget`, default shift)      | Partial in Level 1: default alignment keeps the box within its original containing block when the chosen area overflows. No equivalent of `shiftToCoverTarget`.                                                                                                                |
| `overflowBoundary`, `flipBoundary`, `overflowBoundaryPadding` | No proposal. Fallbacks are tested against the containing block (the viewport for top-layer surfaces); there is no way to name a custom boundary or add padding to it.                                                                                                          |
| Virtual targets (`target` / `setTarget` with a non-element)   | No proposal. An anchor has to be an element with `anchor-name`; there is no way to anchor to coordinates such as the pointer position.                                                                                                                                         |
| Arrow placement, styling by applied fallback                  | [Level 2](https://drafts.csswg.org/css-anchor-position-2/) adds anchored container queries (`container-type: anchored`, `@container anchored(fallback: …)`), which let the surface and its arrow be styled by the fallback that was applied. `arrowPadding` has no equivalent. |
| `onPositioningEnd`, function-form `offset`                    | Script hooks; outside the scope of CSS.                                                                                                                                                                                                                                        |

Follow-up: raise CSSWG issues for custom overflow boundaries and non-element anchors, which are the two gaps with no spec work and the main reasons consumers would need an engine.

## Comparison

Options E to G are of two kinds. E is a strategy for headless like A to D. F and G change the engine in `react-positioning` and compose with any option that ships it (A, C, the proposal); on their own they do not position a headless surface in a browser without anchor support, which is why several of their cells read "n/a".

| Criterion                       | A: Explicit engine                   | B: Automatic fallback (lazy)                             | C: Automatic fallback (floating-ui bundled) | D: Extend CSS       | E: CSS-semantics JS fallback                      | F: Inlined Floating UI port                   | G: Modular engine                                             |
| ------------------------------- | ------------------------------------ | -------------------------------------------------------- | ------------------------------------------- | ------------------- | ------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------- |
| floating-ui in bundle           | Only if consumer imports it (static) | Split chunk, fetched on demand                           | Always (static)                             | Never               | Never; own ~10 kB engine, always (static)         | Inlined port, 24.5 kB, where the engine ships | Inlined port, 12.6–25.2 kB by plugins, where the engine ships |
| Browser without anchor support  | Consumer's choice (provider)         | Handled, with cold-open flash                            | Handled, no flash                           | Polyfill (consumer) | Handled, no flash                                 | n/a (engine option)                           | n/a (engine option)                                           |
| First paint, fallback path      | Positioned before paint              | Cold: unpositioned until chunk lands; warm/preloaded: ok | Positioned before paint                     | n/a                 | Positioned before paint                           | Positioned before paint, synchronous          | Positioned before paint, synchronous                          |
| Which path runs is visible      | Yes (props)                          | No (runtime)                                             | No (runtime)                                | Yes                 | No (runtime)                                      | n/a                                           | n/a                                                           |
| API surface added               | `engine`, provider                   | `preloadPositioning()`                                   | None                                        | None                | `arrowRef`, `enabled`, full `PositioningProps`    | None                                          | `usePositioningCore`, 9 plugins, order slots                  |
| Parity with `react-positioning` | Full with engine; subset without     | Full                                                     | Full                                        | Partial, growing    | Near-full options; behaviour close, not identical | Identical (parity spec)                       | Identical with default plugins; subset otherwise              |
| Library maintenance             | Two paths, engine external           | Two paths + detection, loading, caching, preload         | Two paths + detection                       | Growing CSS surface | Three implementations (CSS, CSS mimic, v9 engine) | Owned fork of Floating UI                     | Owned fork + plugin layer                                     |
| Consumer effort                 | Must opt in where needed             | None                                                     | None                                        | None                | None                                              | None                                          | Choose plugins (opt-in)                                       |
| Migration from v9               | Add engine where needed              | Same API                                                 | Same API                                    | Same API, subset    | Same API, small pixel drift                       | Same                                          | Same                                                          |
| Can change without breaking     | No (engine is public API)            | Yes (implementation detail)                              | Yes (implementation detail)                 | Yes                 | Yes (implementation detail)                       | Yes (engine is internal)                      | No (plugins are public API)                                   |

## Proposal

Adopt **Option A's opt-in model with C's runtime behaviour**: CSS anchor positioning by default, and a single provider from a separate entry that switches the surfaces below it to Floating UI, either as a fallback or everywhere. The engine itself is not public API.

Full parity with `react-positioning` (geometry-dependent options) requires a JS engine in every option; CSS alone cannot provide it. The question is only who pays for the engine and who decides when it loads.

Option B is ruled out: the library does not lazy-load positioning code. Besides the cold-start flash, a library-owned `import()` leaves chunking to each consumer's bundler, where it can be split unpredictably or duplicated.

Option C fixes B's cold start by shipping the engine always, but every headless consumer then pays the bundle whether they need it or not. Instead, C's behaviour is offered as an opt-in provider:

```tsx
import { PositioningProvider } from '@fluentui/react-headless-components-preview/positioning-floating-ui';

// recommended: CSS where it is enough, Floating UI where it is not
<PositioningProvider mode="fallback">
  <App />
</PositioningProvider>;

// Floating UI for every surface below (exact v9 behaviour, or a workaround for a native anchoring issue)
<PositioningProvider mode="floating-ui">
  <App />
</PositioningProvider>;

// back to CSS only for a subtree
<PositioningProvider mode="css">
  <Section />
</PositioningProvider>;
```

- Without a provider, headless surfaces use CSS anchor positioning only, as today.
- In `fallback` mode each surface uses CSS anchor positioning when the browser supports `position-area` and its options are CSS-eligible, and Floating UI otherwise. One part of an app that needs `autoSize` therefore does not opt the rest of the app out of native anchoring.
- The nearest provider wins, so a nested provider overrides the mode for its subtree, down to a single surface. There is no per-surface `engine` option.
- The provider lives in its own entry (`positioning-floating-ui`), so `@floating-ui/*` is only bundled by apps that import it; the rest of the headless package stays free of it.

Because consumers select a mode, not an engine, the engine stays an implementation detail: the library can replace Floating UI, or drop it as the platform covers more of the contract (see [Platform gaps](#platform-gaps)), without a breaking change. The public commitment is limited to `PositioningProvider` and its `mode` values.
