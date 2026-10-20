# @fluentui/react-positioning

A React utilities built on top of [Floating UI](https://floating-ui.com/) for positioning elements in the DOM.

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
layout differences, iframe/shadow-root targets, and visual-viewport/mobile behavior are not
covered. The explicit `strategy: 'absolute'` case deliberately records the existing baseline's
`fixed` result; changing that behavior requires a separate intentional compatibility decision.
