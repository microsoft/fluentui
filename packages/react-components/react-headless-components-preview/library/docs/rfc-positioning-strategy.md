# RFC: Positioning strategy for headless components

---

Contributors: [@mainframev](https://github.com/mainframev)

Stakeholders: `@fluentui/react-headless-components-preview` maintainers, `@fluentui/react-positioning` maintainers, headless component consumers

## Summary

Headless components (`Popover`, `Menu`, `Tooltip`, ...) position their surfaces with CSS anchor positioning. That covers the `positioning` API only partially: the geometry-dependent options are not implemented, and older browser versions do not support CSS anchor positioning. Two PRs propose different ways to close the gap:

- [#36800](https://github.com/microsoft/fluentui/pull/36800): the consumer passes a JavaScript engine explicitly (`positioning={{ engine }}` or `PositioningEngineProvider`).
- [#36124](https://github.com/microsoft/fluentui/pull/36124): the library decides at runtime and lazy-loads a floating-ui fallback when the browser or the requested options need it.

This RFC compares four options (explicit engine, automatic fallback with a lazy import, automatic fallback with floating-ui bundled, extend the CSS path) on bundle impact, browser behaviour, API complexity, parity with `react-positioning`, and maintenance cost, and recommends one.

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

| Criterion                       | A: Explicit engine                   | B: Automatic fallback (lazy)                             | C: Automatic fallback (floating-ui bundled) | D: Extend CSS       |
| ------------------------------- | ------------------------------------ | -------------------------------------------------------- | ------------------------------------------- | ------------------- |
| floating-ui in bundle           | Only if consumer imports it (static) | Split chunk, fetched on demand                           | Always (static)                             | Never               |
| Browser without anchor support  | Consumer's choice (provider)         | Handled, with cold-open flash                            | Handled, no flash                           | Polyfill (consumer) |
| First paint, fallback path      | Positioned before paint              | Cold: unpositioned until chunk lands; warm/preloaded: ok | Positioned before paint                     | n/a                 |
| Which path runs is visible      | Yes (props)                          | No (runtime)                                             | No (runtime)                                | Yes                 |
| API surface added               | `engine`, provider                   | `preloadPositioning()`                                   | None                                        | None                |
| Parity with `react-positioning` | Full with engine; subset without     | Full                                                     | Full                                        | Partial, growing    |
| Library maintenance             | Two paths, engine external           | Two paths + detection, loading, caching, preload         | Two paths + detection                       | Growing CSS surface |
| Consumer effort                 | Must opt in where needed             | None                                                     | None                                        | None                |
| Migration from v9               | Add engine where needed              | Same API                                                 | Same API                                    | Same API, subset    |
| Can change without breaking     | No (engine is public API)            | Yes (implementation detail)                              | Yes (implementation detail)                 | Yes                 |

## Proposal

Adopt **Option A**: land [#36800](https://github.com/microsoft/fluentui/pull/36800)'s `engine` option and `PositioningEngineProvider`. CSS by default; an engine owns positioning when the consumer supplies one. `floatingUIPositioningEngine` stays in `@fluentui/react-positioning`.

Full parity with `react-positioning` (geometry-dependent options, virtual targets) requires a JS engine in every option; CSS alone cannot provide it. The question is only who pays for the engine and who decides when it loads.

Option B is ruled out: the library does not lazy-load positioning code. Besides the cold-start flash, a library-owned `import()` leaves chunking to each consumer's bundler, where it can be split unpredictably or duplicated.

Option C fixes B's cold start by shipping the engine always, but every headless consumer then pays the bundle whether they need it or not. Instead, C's behaviour is offered on top of A's contract as an opt-in fallback, with the engine supplied from userland:

- The headless package exports a helper that marks an engine as a fallback. Headless `usePositioning` then uses CSS anchor positioning when the browser supports it and the options and target are CSS-eligible, and hands over to the wrapped engine otherwise.
- The consumer still imports the engine (`floatingUIPositioningEngine`) statically from `@fluentui/react-positioning`, typically app-wide through `PositioningEngineProvider`.

```tsx
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';
import { PositioningEngineProvider, fallbackPositioningEngine } from '@fluentui/react-headless-components-preview';

<PositioningEngineProvider value={fallbackPositioningEngine(floatingUIPositioningEngine)}>
  <App />
</PositioningEngineProvider>;
```

This is the recommended setup for apps that need full parity or older browser versions; apps that only use CSS-eligible options can use headless without any engine. It also addresses the scale problem of a plain engine in the provider: with the fallback wrapper at the root, surfaces that CSS can handle still use native anchoring, and only the ones that need the engine hand over to it. The helper is a small addition to the headless API and can land in a follow-up without changing the `engine` option.

The trade-off is that A's API is a long-term commitment: B and C keep the fallback private and could drop it later without a breaking change, whereas `engine` and the provider can only be deprecated through a major version. A keeps that commitment small by making `PositioningEngine` a minimal interface that any engine can implement, so a future engine can be added without changing the public API.
