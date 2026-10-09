// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

type InfoButtonLike = React.ComponentType<{
  size?: 'small' | 'medium' | 'large';
  info?: unknown;
  popover?: { open?: boolean; positioning?: string };
}>;

type Cell = { label: string; size: 'medium' | 'large'; positioning?: string };

/**
 * An EVEN integer, and the grid's columns are integral, so every centred surface resolves to a
 * whole-pixel x on both sides. Left to size itself from its text the surface takes a fractional
 * width — windmod's CSS anchor positioning resolves the true centre while floating-ui rounds to
 * the device pixel — and a half-pixel shift moves every pixel of the text AND of the 16px drop
 * shadow, which a strict gate counts in full.
 */
const CONTENT_WIDTH = 160;

/**
 * Four cells. A and C use the default `above-start`, an ALIGNED placement, so the arrow sits a
 * fixed inset from the surface edge rather than centred on the trigger — the accepted native
 * delta. B and D repeat them centred, where anchor positioning and floating-ui agree exactly, so
 * each aligned cell has its own control inside the same capture: a non-zero centred cell is not
 * that delta and stops the cycle.
 *
 * C and D run at `size="large"`, the only cells anywhere that render the body1 surface typography
 * and the 11.312px arrow height the large size selects through the popover size map.
 */
const cells: Cell[] = [
  { label: 'A aligned', size: 'medium' },
  { label: 'B centred', size: 'medium', positioning: 'above' },
  { label: 'C aligned large', size: 'large' },
  { label: 'D centred large', size: 'large', positioning: 'above' },
];

/**
 * `open: true` is CONTROLLED on purpose: `useInfoButton` assigns `state.popover.open` without
 * clearing `defaultOpen`, so the inner Popover would receive both and useControllableState would
 * warn. Both libraries do this, so there is nothing to fix upstream — only to route around.
 */
export const InfoLabelOpenVrScene = ({
  InfoButton,
  surfaceProps,
}: {
  InfoButton: InfoButtonLike;
  surfaceProps: { popover?: string };
}): React.ReactNode => (
  <>
    {/* Only one surface can hold focus, so with four pinned open the LAST one holds it on BOTH
        sides — the windmod side through the headless hook's own focus effect, the Griffel side
        through its popover's — and with no prior user interaction the browser resolves
        :focus-visible on it and paints a user-agent ring. Measured: both surfaces are the active
        element and both match :focus-visible, so the suppression has to name both spellings of
        the surface or the Griffel ring survives alone and diffs its whole cell. */}
    <style>
      {`[data-popover-surface]:focus-visible,
        .fui-PopoverSurface:focus-visible { outline: none; }`}
    </style>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 240px)',
        placeItems: 'center',
        padding: '60px 120px',
        background: '#fff',
        width: 1280,
        height: 720,
        boxSizing: 'border-box',
      }}
    >
      {cells.map(cell => (
        <InfoButton
          key={cell.label}
          size={cell.size}
          info={{
            children: <span style={{ display: 'block', width: CONTENT_WIDTH }}>Example info.</span>,
            ...surfaceProps,
          }}
          popover={{ open: true, ...(cell.positioning ? { positioning: cell.positioning } : {}) }}
        />
      ))}
    </div>
  </>
);
