// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

type TeachingPopoverLike = React.ComponentType<{
  open?: boolean;
  trapFocus?: boolean;
  positioning?: string;
  children: React.ReactNode;
}>;

type TriggerLike = React.ComponentType<{ children: React.ReactElement }>;

type SurfaceLike = React.ComponentType<{ popover?: string; children: React.ReactNode }>;

type HeaderLike = React.ComponentType<{ children?: React.ReactNode }>;

type ButtonLike = React.ComponentType<{ style?: React.CSSProperties; children?: React.ReactNode }>;

/**
 * Header only: the surface stays at its 320px floor and roughly 64px tall, which is what lets all
 * eight placements clear each other inside one 1280 × 720 viewport.
 *
 * Two trigger widths, for two different reasons. A BLOCK-axis cell needs a trigger wider than the
 * 320px surface, or the placement observer's 2px alignment tolerance reports a centred surface as
 * `-start`/`-end`. An INLINE-axis cell needs a narrow trigger, so the surface it throws 320px
 * sideways still clears the cell opposite.
 */
const BLOCK_TRIGGER_WIDTH = 360;
const INLINE_TRIGGER_WIDTH = 100;

type Cell = { positioning: string; column: number; inline?: boolean };

/**
 * Eight cells on a 3 × 4 grid. Rows run downward-placing → inline → inline → upward-placing, so no
 * surface ever reaches into an occupied neighbour, and no outward-placing cell sits in the column
 * nearest the edge it places toward.
 *
 * The aligned band carries ALL FOUR aligned placements, not a sample: `above-start` / `below-end`
 * reach only the inline-axis arrow rules, while `before-top` / `after-bottom` are the only cells
 * that reach the block-axis pair — and `before` / `after` are the only placements with an RTL
 * override block.
 */
const rows: Cell[][] = [
  [
    { positioning: 'below', column: 1 },
    { positioning: 'below-end', column: 2 },
  ],
  [
    { positioning: 'after', column: 1, inline: true },
    { positioning: 'before', column: 3, inline: true },
  ],
  [
    { positioning: 'after-bottom', column: 1, inline: true },
    { positioning: 'before-top', column: 3, inline: true },
  ],
  [
    { positioning: 'above', column: 1 },
    { positioning: 'above-start', column: 2 },
  ],
];

export const TeachingPopoverPlacementsVrScene = ({
  TeachingPopover,
  TeachingPopoverTrigger,
  TeachingPopoverSurface,
  TeachingPopoverHeader,
  Button,
  surfaceProps,
}: {
  TeachingPopover: TeachingPopoverLike;
  TeachingPopoverTrigger: TriggerLike;
  TeachingPopoverSurface: SurfaceLike;
  TeachingPopoverHeader: HeaderLike;
  Button: ButtonLike;
  surfaceProps: { popover?: string };
}): React.ReactNode => (
  <>
    {/* Suppressed on BOTH sides — see TeachingPopoverVrScene for why it is unqualified. */}
    <style>{`:focus-visible { outline: none; }`}</style>
    <div
      style={{
        display: 'grid',
        // Explicit INTEGRAL tracks, not `1fr`: 1280 / 3 is 426.67, and a fractional column centre
        // makes windmod's anchor positioning resolve the true centre while floating-ui rounds to
        // the device pixel — a third of a pixel apart, which moves every glyph in the surface.
        // Same rule the shipped PopoverVrScene states for its own widths.
        gridTemplateColumns: 'repeat(3, 400px)',
        gridTemplateRows: 'repeat(4, 180px)',
        justifyContent: 'center',
        placeItems: 'center',
        background: '#fff',
        width: 1280,
        height: 720,
        boxSizing: 'border-box',
      }}
    >
      {rows.map((row, rowIndex) =>
        row.map(({ positioning, column, inline }) => (
          // trapFocus is pinned off on BOTH sides: Griffel's TeachingPopover defaults it ON, which
          // paints nothing but would run eight focus traps against each other in one page.
          <div key={positioning} style={{ gridColumn: column, gridRow: rowIndex + 1 }}>
            <TeachingPopover open trapFocus={false} positioning={positioning}>
              <TeachingPopoverTrigger>
                <Button style={{ width: inline ? INLINE_TRIGGER_WIDTH : BLOCK_TRIGGER_WIDTH }}>{positioning}</Button>
              </TeachingPopoverTrigger>
              <TeachingPopoverSurface {...surfaceProps}>
                <TeachingPopoverHeader>{positioning}</TeachingPopoverHeader>
              </TeachingPopoverSurface>
            </TeachingPopover>
          </div>
        )),
      )}
    </div>
  </>
);
