# RFC: Positioning strategy for headless components

---

Contributors: [@mainframev](https://github.com/mainframev)

Stakeholders: `@fluentui/react-headless-components-preview` maintainers, `@fluentui/react-positioning` maintainers, headless component consumers

## Summary

Headless components (`Popover`, `Menu`, `Tooltip`, ...) position their surfaces with CSS anchor positioning. That leaves two gaps: the geometry-dependent `positioning` options are not implemented, and browser versions without anchor support render surfaces unpositioned. This RFC compares options A–E (B and E were explored and discarded) and proposes **Option C**: CSS by default, and an automatic fallback to `usePositioning()` from `@fluentui/react-positioning`, backed by the standalone engine from [#36951](https://github.com/microsoft/fluentui/pull/36951), which no longer includes Floating UI at runtime.

## Background

**The contract.** `@fluentui/react-positioning` (v9) positions with floating-ui and exposes `PositioningProps`. The headless package reuses that contract but implements it with CSS (`anchor-name`, `position-anchor`, `position-area`, `position-try-fallbacks`).

- CSS covers: `position`, `align`, `offset`, `coverTarget`, `matchTargetSize`, `pinned`, `fallbackPositions`, `strategy`, `target` with a DOM element.
- CSS cannot cover, because they need measured geometry: `autoSize`, `flipBoundary`, `overflowBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget`, `arrowPadding`, `useTransform`, `disableUpdateOnResize`, `onPositioningEnd`, function-form `offset`. These are ignored today.
- Virtual targets (`target` / `positioningRef.setTarget` with an object that has `getBoundingClientRect`) also need JavaScript, because `anchor-name` must be set on an element. Today the CSS path silently anchors to the trigger instead, so a `Menu` with `openOnContext` opens at the trigger, not at the pointer.

**Browser support.** [CSS Anchor Positioning Module Level 1](https://drafts.csswg.org/css-anchor-position-1/) is Baseline newly available (2026): Chromium 125, Safari 26, Firefox 147. Headless uses `position-area`, which Chromium supports from 129 (125–128 shipped it as `inset-area`), so the effective minimum is Chromium 129, Safari 26, Firefox 147. Feature detection therefore tests `position-area`, not `anchor-name`. In older browser versions only placement breaks: the surface still opens, closes, moves focus, dismisses and keeps its accessibility semantics, but appears at its default position.

**The cost of the v9 engine.** `usePositioning` from `react-positioning` always includes every middleware (offset, flip, shift, maxSize, coverTarget, matchTargetSize, arrow, hide, intersecting). Measured with the package's monosize fixture (`yarn nx run react-positioning:bundle-size`, production webpack, React external):

| What                                                                                                               | Minified | Gzip    |
| ------------------------------------------------------------------------------------------------------------------ | -------- | ------- |
| `usePositioning` (Fluent manager + all middlewares + `@floating-ui/dom`)                                           | 29.2 kB  | 10.3 kB |
| of which `@floating-ui/dom` (includes `@floating-ui/core`)                                                         | 21.0 kB  | 8.2 kB  |
| remainder: Fluent wrappers, `createPositionManager`, options resolution                                            | ~8 kB    | ~2 kB   |
| Floating UI engine behind `/positioning-floating-ui` in [#36800](https://github.com/microsoft/fluentui/pull/36800) | 27.2 kB  | 9.8 kB  |
| `usePositioning` with the standalone engine from [#36951](https://github.com/microsoft/fluentui/pull/36951)        | 11.9 kB  | 5.4 kB  |

`@floating-ui/devtools` is compiled out of production. Each option below lists its own cost.

## Problem statement

Consumers of headless components need:

1. A surface positioned correctly in every supported browser.
2. The geometry-dependent options when their product needs them (`autoSize` and boundaries are used widely in Teams and Office).
3. Predictable cost: headless is meant to stay lightweight, so only pages that need a JavaScript engine should pay for one.

The library needs one rule for which code runs when, that can be documented and tested, and that does not fork behaviour between browsers in ways consumers cannot see.

## Options

Each option lists the changes it needs in `react-positioning` as well as in headless.

### Option A: Opt-in provider ([#36800](https://github.com/microsoft/fluentui/pull/36800), closed)

```tsx
import { PositioningProvider } from '@fluentui/react-headless-components-preview/positioning-floating-ui';

// CSS where it is enough, Floating UI where it is not
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

Without a provider, surfaces use CSS only, and options CSS cannot express are ignored with a dev warning that points to `PositioningProvider`. `fallback` mode makes the same per-surface decision as C: CSS when the browser supports `position-area` and the options are CSS-eligible, Floating UI otherwise. `floating-ui` mode uses Floating UI for every surface below it, and the nearest provider wins. Consumers pick a mode, not an engine; the engine stays internal.

**Cost:** 0 kB without the provider. Apps that import `/positioning-floating-ui` pay for the Floating UI engine, 27.2 kB / 9.8 kB gzip; `verify-bundle-isolation` keeps the other headless entries free of it. The engine would shrink on top of #36951 (see C), not measured yet.

Pros

- The engine ships only in apps that import the provider entry.
- With `mode="fallback"` at the app root, CSS still positions every surface it can; only surfaces that need Floating UI switch.
- The mode is visible in the tree, and a nested provider scopes it to a subtree, down to a single surface.
- The engine is internal, so it can be replaced (for example by #36951) without a breaking change.
- `mode="floating-ui"` gives exact v9 behaviour, or a workaround for a native anchoring issue.

Cons

- Without a provider, older browsers render surfaces unpositioned and engine-only options only produce a dev warning. Consumers must know to add the provider.
- `PositioningProvider`, its modes and the `/positioning-floating-ui` entry become public API. Retiring them once the platform catches up is a breaking change, or they stay as no-ops.
- In `fallback` mode the two paths follow different rules, as in C.
- Migrating from v9 means adding a provider wherever the product relies on engine-only options, virtual targets or older browsers.

### Option B: Automatic fallback, lazy-loaded ([#36124](https://github.com/microsoft/fluentui/pull/36124)) — discarded

Explored and dropped. The library decided at runtime and `import()`ed floating-ui only when needed. Lazy loading at library level means a cold-open flash while the chunk loads, and the consumer's bundler, not the library, decides how that chunk is split, so it can end up duplicated. Option C keeps the runtime decision without the lazy load.

### Option C: Automatic fallback to `react-positioning`, bundled ([#36841](https://github.com/microsoft/fluentui/pull/36841) + [#36951](https://github.com/microsoft/fluentui/pull/36951))

CSS anchor positioning stays the default. When CSS cannot do the job, the surface is positioned by `usePositioning()` from `@fluentui/react-positioning`, the same hook v9 components use. Headless has no engine of its own.

```ts
const jsMode =
  !CSS.supports('position-area: top') ||
  isVirtualTarget(target) || // `target` or `positioningRef.setTarget()` without a DOM node
  !!arrowElement ||
  !!(autoSize || shiftToCoverTarget || flipBoundary || overflowBoundary || overflowBoundaryPadding) ||
  typeof offset === 'function';
```

**When JavaScript runs:** the browser does not support `anchor-name` / `position-area`, or an option cannot be expressed in CSS: `autoSize`, `shiftToCoverTarget`, function `offset`, `flipBoundary` / `overflowBoundary` / `overflowBoundaryPadding`, an element attached to `arrowRef`, or a virtual target. The decision is re-evaluated at runtime. A `Menu` opened as a context menu (virtual target) and later from its trigger switches paths, and the other path's styles are removed.

**How:** both hooks always run and receive the same elements through stable refs; only one is enabled. Options are passed through with two adjustments: the headless default `strategy: 'fixed'`, and `start` / `end` mapped to `top` / `bottom` for `before` / `after`, which `react-positioning` would otherwise center. Both paths set `data-placement`, `data-popper-reference-hidden` and `data-popper-escaped`, and call `onPositioningEnd`. `positioningRef.updatePosition()` updates whichever path is active.

**Types:** the public types are re-exports from `@fluentui/react-positioning`, and a compile-time test fails if they diverge. `usePositioning` takes `PositioningProps` plus `enabled`, and also returns `arrowRef`.

**Tests:** a Cypress spec renders the hook on CSS and with anchor support disabled, and compares the rects for every position and alignment, with offsets, RTL, `coverTarget`, `strategy: 'absolute'`, `fallbackPositions` and `align: 'top'`, plus the arrow and `autoSize` on the JavaScript path. It passes in Electron 130 and Chrome 156.

**Cost** (`usePositioning.fixture.js`, monosize, master + #36841 + `experimental/positioning-engine`): 18.7 kB / 7.4 kB gzip with the #36951 engine. C also works on today's Floating UI engine, at 35.9 kB / 12.2 kB gzip, so it does not block on #36951. `AllComponents.fixture.js` still passes `verify-bundle-isolation`.

**Requires in `react-positioning`: standalone engine ([#36951](https://github.com/microsoft/fluentui/pull/36951)).** `react-positioning` replaces the `@floating-ui/dom` runtime and `@floating-ui/devtools` with its own engine (`src/engine`, `src/middleware`). Only Floating UI types are still imported, and the public hook and its options are unchanged. It is merged into `experimental/positioning-engine`, not yet into master. It benefits v9 components on its own, so it can land on master first.

- **Parity:** the engine must pass the geometry contract already on master (`usePositioning.geometry.cy.tsx`). It pins exact rectangles, placement, max sizes, arrow coordinates and visibility attributes as literal values captured from the Floating UI engine, across the position × alignment × direction matrix, flips, fallbacks, boundaries, offsets, `autoSize`, `coverTarget`, `matchTargetSize`, transforms, virtual targets and fractional DPR. Raster comparisons run against unchanged Floating UI source. Electron and WebKit regressions cover shadow DOM, iframes, top-layer surfaces and WebKit visual-viewport offsets.
- **Size:** `usePositioning` goes from 29.2 kB / 10.3 kB gzip to 11.9 kB / 5.4 kB gzip for every consumer, v9 components included. A CI target fails the build above 12,000 minified bytes.
- **Performance:** a paired benchmark against Floating UI (24 instances, flat and 12-level nested scroll layouts) measured 0.38–0.69× Floating UI's time for initialization, imperative updates, scroll and resize, with every 95 % confidence interval below 1. One host only (Apple M3 Max, Electron 33 / Chromium 130).
- **Engine alternatives explored:** an inlined Floating UI port ([#36839](https://github.com/microsoft/fluentui/pull/36839), 24.5 kB / 9.0 kB gzip, about 1.6k lines of forked code), superseded by #36951 at half the size; and a modular engine with plugins ([#36840](https://github.com/microsoft/fluentui/pull/36840), 12.6–25.2 kB), deferred because a subset of an 11.9 kB engine saves little while a second hook and nine plugins would become public API.

Pros

- No configuration: older browsers and virtual targets work by default, which also fixes the `openOnContext` menu.
- No flash and no extra request: the engine is already loaded when the surface opens, and both paths position before paint.
- The JavaScript path is v9's own hook, so placement on that path is identical to v9 and every option is supported. There is no separate engine to keep aligned.
- A page that uses both v9 components and headless ships one engine.
- #36951 makes that engine less than half its current size and faster on every measured workload, for v9 components too, with no third-party runtime dependency.
- The fallback is internal. Public additions are `arrowRef`, `enabled` and the full `PositioningProps`, so the fallback can shrink as the platform covers more of the contract.

Cons

- Every headless page pays for the engine, including pages that only use CSS-eligible options in browsers with anchor support. On the #36951 engine that is 7.4 kB gzip for the whole hook.
- Which path runs is invisible, and consumers cannot opt out of shipping the engine.
- The two paths follow different rules:
  - `react-positioning` takes the direction from the Fluent provider (`useFluent().dir`), CSS from the containing block. Without a provider in an RTL document, `before` / `after` land on opposite sides.
  - Cross-axis offsets differ for `end` and `center` alignments, because CSS uses symmetric margins.
  - In Chromium ≤ 130, `place-self: anchor-center` centers on the anchor in both axes, so the CSS path overlaps the target. The comparison spec skips centered cases where a probe detects it.
- An arrow always forces JavaScript. No headless component wires `arrowRef` yet.
- With #36951, Fluent owns a from-scratch engine with no upstream: browser quirks that Floating UI fixes have to be found and fixed here. `@floating-ui/dom` stays a dependency for its types.
- Visual regression and SSR suites have not been run, and the engine benchmark comes from one host.

### Option D: Extend CSS only

Keep CSS as the only path and add `autoSize` and the overflow/flip boundaries to it. Older browsers are left to the [`@oddbird/css-anchor-positioning`](https://github.com/oddbird/css-anchor-positioning) polyfill (already used by `@fluentui/web-components`), loaded by consumers who need them.

**Cost:** 0 kB; consumers that load the polyfill pay for it.

Pros

- No JavaScript engine, positioned on first paint, and the API is unchanged.

Cons

- The polyfill does not fit headless. Older browsers drop the inline `anchor-name` and `position-area` styles headless sets, so the polyfill never sees them. It does not support anchors added on mount, and its `position-area` differs from the native behaviour. It also depends on `@floating-ui/dom`.
- Parity stays partial; every added option is a second implementation to keep aligned with `react-positioning`.
- Open-ended maintenance while CSS anchor semantics are still moving.

### Option E: CSS-semantics JavaScript fallback inside headless — discarded

Explored in the first iteration of [#36841](https://github.com/microsoft/fluentui/pull/36841) and dropped in favour of C. Headless ran its own JavaScript fallback that recomputed what the browser would do with CSS (`position-area` grid, first-fit `position-try-fallbacks`, margin offsets, containing blocks, RTL), plus internal plugins for `autoSize`, boundaries, the arrow and the hidden state. It cost about 10 kB minified (esbuild proxy) and matched the browser in over 99.5 % of 11,500 random cases. It was a third positioning implementation that had to track browser changes, and its placement drift against v9 was never measured. C gets the same coverage from v9's engine, with identical v9 placement, and with #36951 at a comparable size.

## Comparison

Where a cell depends on the engine, it reads "on #36951 / on today's Floating UI engine".

| Criterion                      | A: Opt-in provider                       | C: Auto fallback to `react-positioning`     | D: Extend CSS       |
| ------------------------------ | ---------------------------------------- | ------------------------------------------- | ------------------- |
| Headless `usePositioning` cost | CSS only; 27.2 kB with the provider      | 18.7 kB / 35.9 kB, always                   | CSS only            |
| Browser without anchor support | Handled with a `fallback` provider       | Handled                                     | Polyfill            |
| Which path runs is visible     | Mode is visible; path per surface is not | No                                          | Yes                 |
| New public API                 | `PositioningProvider`, modes, entry      | `arrowRef`, `enabled`, full props           | None                |
| Parity with v9                 | Full with the provider                   | CSS path partial; JavaScript path identical | Partial             |
| Engines on a page with v9      | One                                      | One                                         | One (plus polyfill) |
| Maintenance                    | Two paths                                | Two paths                                   | Growing CSS layer   |
| Consumer effort                | Add a provider                           | None                                        | Load polyfill       |
| Can change without breaking    | Engine yes; provider no                  | Yes                                         | Yes                 |

## Proposal

Adopt **Option C**, with the #36951 engine: CSS anchor positioning stays the default, and headless falls back to `usePositioning()` from `@fluentui/react-positioning` when CSS cannot do the job. No provider and no engine option.

- Every surface is positioned in every supported browser by default. A and D leave older browsers unpositioned until the consumer acts.
- The JavaScript path is v9's hook, so every option works and placement on that path is identical to v9.
- One engine is shared with v9, so a page with both pays once.
- The headless hook costs 18.7 kB / 7.4 kB gzip in total, compared with 35.9 kB / 12.2 kB for C on today's engine.
- The fallback is internal, so it can shrink or be removed as the platform covers more of the contract.

Known limits: the CSS and JavaScript paths still differ in direction source, cross-axis offsets for `end` / `center`, and `anchor-center` in Chromium ≤ 130; which path runs is invisible; an arrow forces JavaScript; and Fluent owns the engine.

#36951 moves from `experimental/positioning-engine` to master first, independently: it benefits v9 components on its own. #36841 follows on top of it.

### Required verification before this ships

#36841 passes unit tests, the Electron e2e suite and its comparison spec in Electron 130 and Chrome 156. #36951 passes the geometry contract and its Electron and WebKit regressions. These must also pass in CI:

- **Older browsers:** `Popover`, `Menu`, `Tooltip`, `Combobox`, `TagPicker` and `TeachingPopover` e2e with anchor support forced off, and in a real browser without it (Chromium < 129, Safari < 26, Firefox < 147).
- **CSS vs engine:** surfaces look correct on both paths in current Chrome, Safari and Firefox. The paths are not expected to match pixel for pixel; the direction difference is fixed or documented.
- **Scroll, resize and `enabled`:** scrolling ancestors, window resize, `disableUpdateOnResize`, and switching paths while open.
- **Virtual targets:** `target` and `setTarget` with a `getBoundingClientRect` object, including an update after the pointer moves.
- **RTL:** `data-placement` reported the same way on both paths.
- **Runtime performance:** benchmarks in both packages: the #36951 benchmark for `react-positioning` (v9), and an equivalent one for headless `usePositioning` on both paths. Run on more hosts, including Windows.
- **Visual regression and SSR:** VR for v9 components on the new engine and for headless on both paths; SSR confirms detection and the layout effect do not run on the server.
- **Bundle size:** both `usePositioning` fixtures confirmed by the monosize bot once both PRs target master.
