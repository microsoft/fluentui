# RFC: Positioning strategy for headless components

---

Contributors: [@mainframev](https://github.com/mainframev)

Stakeholders: `@fluentui/react-headless-components-preview` maintainers, `@fluentui/react-positioning` maintainers, headless component consumers

## Summary

Headless components (`Popover`, `Menu`, `Tooltip`, ...) position their surfaces with CSS anchor positioning. That covers the `positioning` API only partially: the geometry-dependent options are not implemented, and not every browser supports CSS anchor positioning. Two PRs propose different ways to close the gap:

- [#36800](https://github.com/microsoft/fluentui/pull/36800): the consumer passes a JavaScript engine explicitly (`positioning={{ engine }}` or `PositioningEngineProvider`).
- [#36124](https://github.com/microsoft/fluentui/pull/36124): the library decides at runtime and lazy-loads a floating-ui fallback when the browser or the requested options need it.

This RFC compares four options (explicit engine, automatic fallback with a lazy import, automatic fallback with floating-ui bundled, extend the CSS path) on bundle impact, browser behaviour, API complexity, parity with `react-positioning`, and maintenance cost, and recommends one.

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

- Cold start: the fallback is fetched only after the library decides it is needed, and the surface is already shown while that happens, so the first open can flash unpositioned — a frame or two locally, seconds on a slow connection, two round trips if the helper and `@floating-ui/dom` are separate chunks. Warm opens and `preloadPositioning()` avoid it. When the download starts depends on whether the closed surface stays mounted (Menu starts at page load; Popover starts on first open), and browsers without anchor support take this path for every surface, not only those with engine-only options. None of that is visible to the consumer.
- Predictability: consumers cannot tell which path a given user got, and cannot force one.
- Maintenance: support detection, lazy loading, caching, cancellation on unmount, the preload API, and two implementations that must stay behaviourally aligned (placement names, arrow handling, `onPositioningEnd` semantics) all live in the library and need cross-browser and cross-bundler testing, including SSR.

### Option C: Automatic fallback, floating-ui bundled

Same runtime decision as Option B: CSS when the browser supports it and the options do not need a JS engine, floating-ui otherwise. The difference is there is no `import()`. Floating-ui is a static dependency of the headless package and is always in the bundle; `mode` only turns that engine on or off.

```ts
mode = CSS.supports('anchor-name: --x') && !requiresFloatingUI(options) ? 'anchor' : 'floating';
```

#### Pros

- Bundle timing: no extra request, no `preloadPositioning()`, no mount-vs-unmount fetch policy. The engine is already in memory when the surface opens.
- First paint: the floating-ui path can position synchronously, like Option A. There is no cold-start flash.
- Browser behaviour: consumers write nothing browser-specific. Browsers with anchor support use CSS for eligible surfaces; the rest use the engine that already shipped.
- API: nothing to configure.
- Parity: every `react-positioning` option works in every browser on the first open.
- Maintenance: simpler than B — no lazy loading, chunk caching, in-flight cancellation, or preload API. Still two implementations plus support detection.

#### Cons

- Bundle: every headless page pays the full engine (~29 kB minified / ~10 kB gzip for `usePositioning`, of which ~21 kB / ~8 kB is `@floating-ui/dom`), including pages that only ever use CSS-eligible options in browsers with anchor support. That undercuts the lightweight goal in the problem statement.
- Predictability: consumers cannot tell which path a given user got, and cannot force one or opt out of shipping floating-ui.
- Maintenance: two code paths still have to stay aligned; the unused engine is dead weight on the CSS path rather than a loading-state machine.

### Option D: Extend CSS-based positioning

Keep CSS as the only positioning path and add more of the option set there.

Today CSS covers placement (`position`, `align`, `offset`, `coverTarget`, `matchTargetSize`, `pinned`, `fallbackPositions`, `strategy`, `target`). Geometry-dependent options are ignored: `autoSize`, `overflowBoundary`, `flipBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget`, `arrowPadding`, `onPositioningEnd`, and function-form `offset`.

This option would add `autoSize` and overflow/flip boundaries (`overflowBoundary`, `flipBoundary`, `overflowBoundaryPadding`).

#### Pros

- Bundle: nothing beyond the CSS path.
- API: unchanged; no new concepts for consumers.
- First paint: CSS positions on first paint, no loading step.

#### Cons

- Browser behaviour: does nothing for browsers without anchor support; surfaces there stay unpositioned.
- Parity: remaining options can be added as analogues of floating-ui. That is still a second implementation to keep aligned with `react-positioning`.
- Maintenance: high and open-ended; CSS anchor semantics are still moving.
- Risk: every extra option on the CSS path is another behaviour to keep aligned with `react-positioning` without sharing its engine, so consumers would still see a different positioning model rather than a clear "engine or not" boundary.

## Comparison

| Criterion                       | A: Explicit engine                   | B: Automatic fallback (lazy)                             | C: Automatic fallback (floating-ui bundled) | D: Extend CSS        |
| ------------------------------- | ------------------------------------ | -------------------------------------------------------- | ------------------------------------------- | -------------------- |
| floating-ui in bundle           | Only if consumer imports it (static) | Split chunk, fetched on demand                           | Always (static)                        | Never                |
| Unsupported browser             | Consumer's choice (provider)         | Handled, with cold-open flash                            | Handled, no flash                      | Unpositioned         |
| First paint, fallback path      | Positioned before paint              | Cold: unpositioned until chunk lands; warm/preloaded: ok | Positioned before paint                | n/a                  |
| Which path runs is visible      | Yes (props)                          | No (runtime)                                             | No (runtime)                           | Yes                  |
| API surface added               | `engine`, provider                   | `preloadPositioning()`                                   | None                                   | None                 |
| Parity with `react-positioning` | Full with engine; subset without     | Full                                                     | Full                                   | Partial, growing     |
| Library maintenance             | Two paths, engine external           | Two paths + detection, loading, caching, preload         | Two paths + detection                  | Growing CSS surface  |
| Consumer effort                 | Must opt in where needed             | None                                                     | None                                   | None                 |

## Proposal

Adopt **Option A**: land [#36800](https://github.com/microsoft/fluentui/pull/36800)'s `engine` option and `PositioningEngineProvider`. CSS by default; an engine owns positioning when the consumer supplies one. `floatingUIPositioningEngine` stays in `@fluentui/react-positioning`.

Option C fixes B's cold start by shipping the engine always, but every headless consumer then pays the bundle whether they need it or not. Automatic fallback (lazy as B, or static as C) can still be added later on top of A's contract — a provider that supplies an engine only when CSS is not enough — without changing the public `engine` API. Building either in from the start would hide the choice and make it harder to opt out of.
