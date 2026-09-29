# RFC: Positioning strategy for headless components

---

Contributors: [@mainframev](https://github.com/mainframev)

Stakeholders: `@fluentui/react-headless-components-preview` maintainers, `@fluentui/react-positioning` maintainers, headless component consumers

Authored: 2026-09-29
Feedback until: 2026-10-13

## Summary

Headless components (`Popover`, `Menu`, `Tooltip`, ...) position their surfaces with CSS anchor positioning. That covers the `positioning` API only partially: the geometry-dependent options are not implemented, and not every browser supports CSS anchor positioning. Two PRs propose different ways to close the gap:

- [#36800](https://github.com/microsoft/fluentui/pull/36800): the consumer passes a JavaScript engine explicitly (`positioning={{ engine }}` or `PositioningEngineProvider`).
- [#36124](https://github.com/microsoft/fluentui/pull/36124): the library decides at runtime and lazy-loads a floating-ui fallback when the browser or the requested options need it.

This RFC compares four options (explicit engine, automatic fallback, extend the CSS path, limit the API) on bundle impact, browser behaviour, API complexity, parity with `react-positioning`, and maintenance cost, and recommends one.

## Background

`@fluentui/react-positioning` (v9) positions with floating-ui. It exposes `PositioningProps`: `position`, `align`, `offset`, `coverTarget`, `matchTargetSize`, `pinned`, `fallbackPositions`, `strategy`, `target`, `positioningRef`, plus geometry-dependent options `autoSize`, `flipBoundary`, `overflowBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget`, `arrowPadding`, `useTransform`, `disableUpdateOnResize`, `onPositioningEnd`, and function-form `offset`.

The headless package reuses `PositioningProps` as its contract but implements it with CSS anchor positioning (`anchor-name`, `position-anchor`, `position-area`, `position-try-fallbacks`). The CSS path handles the first group. The second group needs measured geometry (boundary rects, available space, final coordinates) that CSS does not expose to script, so those options are currently ignored (with a dev warning in #36800).

`usePositioning` from `@fluentui/react-positioning` always includes the full middleware set (offset, flip, shift, maxSize, coverTarget, matchTargetSize, arrow, hide, intersecting) — there is no per-option tree-shaking of middlewares. Measured with the package's monosize fixture (`yarn nx run react-positioning:bundle-size`, production webpack, React external):

| What                                                                                          | Minified | Gzip    |
| --------------------------------------------------------------------------------------------- | -------- | ------- |
| `usePositioning` (Fluent manager + all middlewares + `@floating-ui/dom`)                      | 29.2 kB  | 10.3 kB |
| of which `@floating-ui/dom` (includes `@floating-ui/core`)                                    | 21.0 kB  | 8.2 kB  |
| remainder: Fluent wrappers, `createPositionManager`, options resolution                       | ~8 kB    | ~2 kB   |
| `floatingUIPositioningEngine` from [#36800](https://github.com/microsoft/fluentui/pull/36800) | 27.2 kB  | 9.8 kB  |

`@floating-ui/devtools` is compiled out of production. A page that already ships v9 positioning pays this once; a headless-only page pays it only if it imports the engine.

Browser support for CSS anchor positioning at the time of writing: Chromium 125+, Safari 26+, not in Firefox (behind a flag). Without support a headless surface today renders unpositioned.

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
<PositioningEngineProvider engine={floatingUIPositioningEngine}>
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
- Silent gaps: a dev-time warning covers engine-only options without an engine, but nothing warns about a missing engine in a browser without anchor support; the surface is simply unpositioned there.
- Over-correction risk: the simplest safe choice is to put the floating-ui engine in the provider for the whole app, which silently gives up native positioning (and its bundle and first-paint benefits) everywhere.

### Option B: Automatic fallback (#36124)

```ts
mode = CSS.supports('anchor-name: --x') && !requiresFloatingUI(options) ? 'anchor' : 'floating';
```

`requiresFloatingUI` is true for any engine-only option or a virtual target. The decision is made in a layout effect when the surface mounts. The floating-ui implementation sits behind a dynamic `import()` so it is only downloaded when that decision says so; the result is cached module-wide and reused by every surface. `preloadPositioning(options)` lets an app fetch it ahead of time.

#### Pros

- Bundle: floating-ui is not in the main bundle. Bundlers split the fallback into its own chunk(s) (~10 kB gzip for the helper plus `@floating-ui/dom`, matching the full `usePositioning` fixture), fetched on demand and shared by all surfaces.
- Browser behaviour: consumers write nothing browser-specific. Browsers with anchor support use CSS for eligible surfaces; the rest transparently take the fallback.
- API: nothing to configure; `preloadPositioning()` as an escape hatch.
- Parity: every `react-positioning` option works in every browser, once the chunk has loaded.

#### Cons

- First paint: the fallback path has a cold-start problem. On the first open the surface is already in the DOM and shown before the chunk has arrived, so unless the implementation hides it (or places it synchronously) the user sees it unpositioned and then jumping into place. How long depends on the network: a frame or two locally, seconds on a slow connection, and two sequential round trips if the helper and `@floating-ui/dom` are separate chunks. Warm opens and opens after `preloadPositioning()` do not have this problem, but the first open is the one users see.
- Load timing: because the decision runs at mount, when the chunk is fetched depends on whether a component keeps its closed surface mounted. Components that unmount the surface (Popover) load on first open and show the cold-start flash; components that keep it mounted (Menu) start the download at page load, which on a page with several such surfaces amounts to an eager load with worse timing than a static import. Neither behaviour is visible to the consumer.
- Browsers without anchor support pay the download and the cold-start cost for every surface, not just the ones with engine-only options.
- Predictability: consumers cannot tell which path a given user got, and cannot force one.
- Maintenance: support detection, lazy loading, caching, cancellation on unmount, the preload API, and two implementations that must stay behaviourally aligned (placement names, arrow handling, `onPositioningEnd` semantics) all live in the library and need cross-browser and cross-bundler testing, including SSR.

### Option C: Extend CSS-based positioning

Implement more of the option set in the CSS path: `autoSize` via `position-area` + `max-height: calc(anchor-size(...))`/`stretch`, boundaries via `position-visibility` and containing-block tricks, `onPositioningEnd` via `ResizeObserver`/`IntersectionObserver` heuristics.

#### Pros

- Bundle: nothing beyond the CSS path.
- API: unchanged; no new concepts for consumers.
- First paint: CSS positions on first paint, no loading step.

#### Cons

- Browser behaviour: does nothing for browsers without anchor support; surfaces there stay unpositioned.
- Parity: partial at best. `flipBoundary`/`overflowBoundary` with arbitrary elements, `shiftToCoverTarget`, arrow coordinates and `onPositioningEnd` with a placement all require measured geometry. Implementing them in script on top of CSS (observers, `getBoundingClientRect`) means writing a second positioning engine, without floating-ui's collision handling.
- Maintenance: high and open-ended; CSS anchor semantics are still moving (`position-try-order`, `anchor-scope` shipped recently).
- Risk: this is a re-implementation of floating-ui's problem space without floating-ui. The hard cases (nested scroll containers, transformed ancestors, `overflow: clip`, RTL, zoom, virtual targets, boundaries that move) are exactly where floating-ui has years of bug fixes, and each one would have to be rediscovered here. Mixing CSS-driven placement with script-driven adjustments also creates two sources of truth for the same layout, which is a recurring source of flicker and fighting-updates bugs. The result would still behave differently from `react-positioning`, so consumers would face subtle inconsistencies rather than a clear "engine or not" boundary.

### Option D: Limit the API

Keep CSS anchor positioning only. Remove the engine-only options from the headless `PositioningProps` type and document that boundaries, auto-sizing and positioning callbacks are the consumer's concern (wrap the surface, use `position-visibility`, size the content).

#### Pros

- Bundle: smallest possible.
- API: smaller and honest about what the CSS path can do.
- Maintenance: one code path, lowest cost.

#### Cons

- Browser behaviour: browsers without anchor support stay unpositioned unless the consumer solves it outside the library.
- Parity: explicitly none for the removed options; migrating v9 code to headless means rewriting positioning props.
- Consumer effort: `autoSize` and boundaries are among the most requested positioning features in v9; every headless consumer that needs them writes their own engine.

## Comparison

| Criterion                       | A: Explicit engine                   | B: Automatic fallback                                    | C: Extend CSS               | D: Limit API                   |
| ------------------------------- | ------------------------------------ | -------------------------------------------------------- | --------------------------- | ------------------------------ |
| floating-ui in bundle           | Only if consumer imports it (static) | Split chunk, fetched on demand                           | Never                       | Never                          |
| Unsupported browser             | Consumer's choice (provider)         | Handled, with cold-open flash                            | Unpositioned                | Unpositioned                   |
| First paint, fallback path      | Positioned before paint              | Cold: unpositioned until chunk lands; warm/preloaded: ok | n/a                         | n/a                            |
| Which path runs is visible      | Yes (props)                          | No (runtime)                                             | Yes                         | Yes                            |
| API surface added               | `engine`, provider                   | `preloadPositioning()`                                   | None                        | Options removed                |
| Parity with `react-positioning` | Full with engine; subset without     | Full                                                     | Partial, growing            | Reduced                        |
| Library maintenance             | Two paths, engine external           | Two paths + detection, loading, caching, preload         | Second engine in CSS+script | One path                       |
| Consumer effort                 | Must opt in where needed             | None                                                     | None                        | Must solve outside the library |

## Proposal

Adopt **Option A**: land [#36800](https://github.com/microsoft/fluentui/pull/36800)'s `engine` option and `PositioningEngineProvider`. CSS by default; an engine owns positioning when the consumer supplies one. `floatingUIPositioningEngine` stays in `@fluentui/react-positioning`.

Automatic fallback can still be added later on top of this contract (a provider that supplies an engine only when CSS is not enough) without changing the public `engine` API. Building that in from the start as Option B would hide the choice and make it harder to opt out of.
