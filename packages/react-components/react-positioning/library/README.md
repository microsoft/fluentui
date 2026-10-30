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
layout differences and visual-viewport/mobile behavior are not
covered. The explicit `strategy: 'absolute'` case deliberately records the existing baseline's
`fixed` result; changing that behavior requires a separate intentional compatibility decision.

`src/usePositioning.regressions.cy.tsx` adds focused real-browser checks for individual CSS
transforms, shadow-host containing blocks and clipping, boxless overflow ancestors, fixed
surfaces inside absolute wrappers, and bordered/padded/scaled same-origin iframe references.
These cases compare against Floating UI where supported. Individual transform properties predate
support in the pinned oracle, so those cases instead assert physical target/surface alignment.

## Engine parity and size gates

The engine measures in containing-block CSS pixels and resolves matching, offsets, covering,
best-fit flipping, shifting/tethering, available-size constraints, arrows, and visibility in order.
Positioning callbacks and imperative refs do not recreate the manager on callback-only rerenders.

```sh
yarn nx run react-positioning:bundle-size --skip-nx-cache
yarn nx run react-positioning:test-bundle-size
yarn nx run react-positioning:test-raster
yarn nx run react-positioning:benchmark
```

The bundle gate runs the repository's monosize/webpack measurement for the existing
`bundle-size/usePopper.fixture.js` entry, labeled `usePositioning`, and rejects an actual
minified output larger than **15,000 bytes**. This is an absolute, uncompressed limit; gzip
is reported separately. Gate tests cover the inclusive limit and invalid or stale measurements.

The raster target extracts the unchanged lower-PR source from
`788e3b739fe79246a2f8850d1c575cf4018fd744` into a temporary directory, then runs the same
contracts against that implementation and the replacement in Electron. A paint-only wrapper
makes otherwise transparent fixtures visible without changing their layout. It compares every
decoded RGBA pixel, including antialiasing, and writes its report to
`dist/positioning-raster/comparison.json`. It does not update the pinned geometry expectations.
This is bounded fixture coverage on the same browser and host display, not a guarantee of all
option combinations, fonts, browsers, iframe/shadow-root targets, or mobile visual viewports.

The performance target mounts 24 concurrent positioning instances per engine in the same Electron
browser and compares against the unchanged Floating UI implementation from upstream lower PR
`fca219991ed9e907b01274bd89ac1431e51c573a`.
It mounts only one engine at a time, warms up both engines, randomizes workload order, and randomizes
which engine runs first in every pair, including initialization. The inactive engine is unmounted
and its listeners are disposed before timing, so global events cannot contaminate the other
engine's samples. It records paired initialization, imperative, window-scroll, and window-resize
completion times. The mix includes flips/fallbacks, explicit boundaries, arrows, offsets, and
autosizing. It measures completion through the actual `usePositioning` end-event path; setup is
excluded from update timings, while initialization intentionally includes mount-to-all-positioned.
Older reports from the simultaneous-engine harness are not valid evidence for comparative ratios;
use reports with `metadata.activeEngineCount: 1`.

The target reports per-workload median, p95, p10/p90, coefficient of variation, and paired
replacement/oracle ratios. It enforces complete, finite, nonzero samples but intentionally has no
machine-dependent performance pass/fail threshold. Run it on the same host/browser for meaningful
comparisons; investigate workload-specific p95 or ratio regressions rather than relying only on
an aggregate median. Set `POSITIONING_BENCH_SEED` to reproduce or vary the randomized order. The
full samples and browser/machine metadata are written to
`dist/positioning-perf/benchmark.json`; compare runs only with their recorded host and browser
metadata in view.
