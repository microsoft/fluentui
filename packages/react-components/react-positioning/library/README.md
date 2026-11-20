# @fluentui/react-positioning

React utilities for positioning elements in the DOM, using a standalone JavaScript engine.
The fallback preserves the existing Floating UI-based hook's placement and configuration semantics
without importing the Floating UI engine at runtime.

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

## Browser behavior contracts

`src/usePositioning.geometry.cy.tsx` exercises the public hook with real DOM layout and the
unmocked positioning engine. Run it through the existing component-test target:

```sh
yarn nx run react-positioning:e2e --spec=src/usePositioning.geometry.cy.tsx --browser=electron --config=retries=0
```

The committed expectations in `src/usePositioning.geometry-baseline.cy.ts` were captured from
master baseline `f626209351609e43bc98eb8cc1296273faa679b7` using Cypress 14.4.1 / Electron 130
at an 800-by-600 viewport. They pin exact CSS-pixel rectangles, placement, strategy, transform
serialization, left/top, maximum sizes, arrow coordinates, visibility attributes, match-target
CSS variable, and overflow styles. No tolerance or engine-derived expected coordinates are used.
The baseline helper only expands literal expected values. Engine replacements must pass these
expectations, not regenerate them.

For fractional DPR cases with transforms disabled, only rectangle x/y are compared to an
engine-free sibling positioned with the committed literal left/top values. Native layout
quantization is host-dependent: Electron 130 lays out `280.667px` at `280.6640625` on the
original macOS host but at `280.65625` on Linux CI. Both are distinct from device-pixel rounding
performed by the engine. The sibling runs no positioning logic and never reads engine output;
all inline styles, dimensions, placement, and other fields remain exact literal assertions.
The original rectangle snapshots are retained as provenance, not regenerated for each host.
Negative-control tests at DPR 1.5 and 3 reject a `0.001px` left/top change even when native
layout produces the same rectangle, and reject displaced rectangles with unchanged left/top.

Coverage includes the finite 4-position by 5-alignment by 2-direction matrix (including invalid
axis combinations), edge flips, ordered fallbacks and best fit, pinned shifting, tether options,
shift-to-cover limits, number/object/function offsets, arrows, rectangular/element/intersected
element-array/window/scroll/clipping boundaries, independent flip/overflow boundaries, logical
padding, auto-size aliases, target-width matching, target covering, containing-block scaling and
transforms, virtual targets, and fractional rectangles at DPR 1, 1.25, 1.5, 2, and 3. DPR is
controlled independently of the host display; geometry and the engine are never mocked.
Scrollbars are hidden without disabling scrolling so native scrollbar widths do not alter the fixture.
The fixture includes a scoped `::-webkit-scrollbar` rule for the older Chromium bundled with
Cypress 13 in React 17 compatibility tests, which does not support `scrollbar-width`.

Lifecycle cases cover imperative updates and retargeting, target prop removal, option removal,
enable/disable, resize and scroll updates, visibility recovery, native end events, detached
container cleanup, idle behavior, and inline end callbacks that update React state. A safety cap
on the state-updating callback makes an update loop fail without hanging the browser.

These are geometry contracts, not screenshot rasterization baselines or a claim of every
possible combination. Font rasterization, browser zoom, native high-DPI capture, cross-browser
layout differences and native visual-viewport/mobile behavior are not
covered. The explicit `strategy: 'absolute'` case deliberately records the existing baseline's
`fixed` result; changing that behavior requires a separate intentional compatibility decision.

`src/usePositioning.regressions.cy.tsx` adds focused real-browser checks for individual CSS
transforms, shadow-host containing blocks and clipping, boxless overflow ancestors, fixed
surfaces inside absolute wrappers, and bordered/padded/scaled same-origin iframe references.
It also covers boolean/all disabled-tether limiting, assigned-slot ancestry, SVG virtual-reference
clipping, viewport-propagated body overflow, top-layer popovers and modal dialogs and their
descendants, and positioned `display: contents` ancestors in scrolled documents.
These cases compare against Floating UI where supported. Individual transform properties, their
`will-change` hints, and boxless positioned ancestors are not handled by the pinned oracle, so those
cases instead assert physical target/surface alignment and clipping.
The ordered (not clamped) cross-axis limiter bounds are compared against Floating UI with an offset
that inverts them, and an auto-sized surface that removes the scrollbar of its scroll container
checks that clipping is measured again with the rectangles.

## Engine parity and size validation

The engine measures in containing-block CSS pixels and resolves matching, offsets, covering,
best-fit flipping, shifting/tethering, available-size constraints, arrows, and visibility in order.
Positioning callbacks and imperative refs do not recreate the manager on callback-only rerenders.
Outside of production builds every result is still reported to the Floating UI devtools extension;
the state it reads is assembled from the result as the engine has no middleware.

```sh
yarn nx run react-positioning:bundle-size --skip-nx-cache
yarn nx run react-positioning:test-bundle-size
yarn nx run react-positioning:test-webkit
```

The bundle gate runs the repository's monosize/webpack measurement for the existing
`bundle-size/usePopper.fixture.js` entry, labeled `usePositioning`, and rejects an actual
minified output larger than **12,000 bytes**. This is an absolute, uncompressed limit; gzip
is reported separately. Gate tests cover the inclusive limit and invalid or stale measurements.

The WebKit target runs focused real-browser checks for filtered ancestors and nested
top-layer surfaces. Filter cases preserve the pinned Floating UI WebKit exception; nested
top-layer cases assert physical layout, including containment by the top-layer ancestor itself.
It requires the workspace's Playwright WebKit browser installation.
It also compares fixed/absolute positioning, containing blocks, and rectangular boundaries
against Floating UI with controlled visual-viewport offsets. Element geometry remains real;
the viewport metrics are emulated, so these checks do not replace native pinch-zoom/pan testing.

The package is compiled to ES2019, so the engine avoids optional chaining and nullish coalescing
in hot paths (they are lowered to verbose helpers), prefers expression-bodied helpers, and keeps
DOM traversal in one place (`src/engine/platform.ts`) that the scroll-parent listing reuses.
