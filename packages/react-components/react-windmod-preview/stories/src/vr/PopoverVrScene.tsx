// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

type PopoverLike = React.ComponentType<{
  open?: boolean;
  size?: string;
  appearance?: string;
  withArrow?: boolean;
  positioning?: string;
  children: React.ReactNode;
}>;

type PopoverTriggerLike = React.ComponentType<{ children: React.ReactElement }>;

type PopoverSurfaceLike = React.ComponentType<{ popover?: string; children: React.ReactNode }>;

type ButtonLike = React.ComponentType<{ style?: React.CSSProperties; children?: React.ReactNode }>;

/**
 * Both boxes are pinned to EVEN integer widths, and the grid's columns are integral, so every
 * centred surface resolves to a whole-pixel x on both sides. Left to size themselves from their
 * text, the two disagree by a fraction of a pixel — windmod's CSS anchor positioning resolves the
 * true centre while floating-ui rounds to the device pixel — and a half-pixel shift moves every
 * pixel of the 16px drop shadow, which a strict-zero gate counts in full.
 *
 * The trigger is also kept comfortably WIDER than every surface: the headless placement observer
 * classifies alignment with a 2px tolerance (computePosition.ts), so a surface whose edge lands
 * within 2px of the trigger's is reported as `-start`/`-end` rather than centred, which moves the
 * arrow from the middle to 8px from the edge.
 */
const TRIGGER_WIDTH = 140;
const CONTENT_WIDTH = 80;

type Cell = {
  label: string;
  positioning?: string;
  size?: string;
  appearance?: string;
  withArrow?: boolean;
};

/**
 * Four bands, fourteen cells, laid out as a 4 × 4 grid with a blank tail on the last two rows.
 * `trapFocus` cannot appear here: showModal() paints a viewport-wide ::backdrop that would cover
 * every other cell.
 */
const bands: Cell[][] = [
  // Main-axis arrow rules, centred.
  [{ label: 'above' }, { label: 'after' }, { label: 'below' }, { label: 'before' }].map(cell => ({
    ...cell,
    positioning: cell.label,
  })),
  // Cross-axis arrow rules, where anchor positioning and floating-ui disagree.
  [{ label: 'above-start' }, { label: 'after-bottom' }, { label: 'below-end' }, { label: 'before-top' }].map(cell => ({
    ...cell,
    positioning: cell.label,
  })),
  // 12/16/20px padding and the 8.484px vs 11.312px arrow split.
  [
    { label: 'small', size: 'small' },
    { label: 'medium', size: 'medium' },
    { label: 'large', size: 'large' },
  ],
  // The two appearance classes, and the no-arrow offset.
  [
    { label: 'brand', appearance: 'brand' },
    { label: 'inverted', appearance: 'inverted' },
    { label: 'no arrow', withArrow: false },
  ],
];

/**
 * Every cell keeps a full surface height of clearance on its placement side, and no cell that
 * places OUTWARD sits in the column nearest that edge: anchor positioning's position-try-fallbacks
 * and floating-ui's flip fire at different thresholds, so a cell close to an edge diverges for a
 * reason that has nothing to do with parity.
 */
export const PopoverVrScene = ({
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
  surfaceProps,
}: {
  Popover: PopoverLike;
  PopoverTrigger: PopoverTriggerLike;
  PopoverSurface: PopoverSurfaceLike;
  Button: ButtonLike;
  surfaceProps: { popover?: string };
}): React.ReactNode => (
  <>
    {/* Showing a popover focuses it, so the last surface to open holds focus. With no prior user
        interaction the browser resolves :focus-visible to true on it and paints a UA ring — but
        measured, opening the same popover with a real mouse click leaves :focus-visible false and
        paints nothing. The scene captures that resting appearance; the focus itself is left alone
        because it is the platform's correct behaviour. */}
    <style>{`[data-popover-surface]:focus-visible { outline: none; }`}</style>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 170px)',
        placeItems: 'center',
        padding: '20px 60px',
        background: '#fff',
        width: 1280,
        height: 720,
        boxSizing: 'border-box',
      }}
    >
      {bands.map((band, index) => (
        <React.Fragment key={index}>
          {band.map(({ label, withArrow = true, ...look }) => (
            // Only DEFINED look props are spread: Griffel applies its own defaults by object spread
            // (`{ size: 'medium', ...props }`), so an explicit `size={undefined}` overwrites the
            // default and leaves its surface unpadded, while windmod's destructuring default holds.
            <Popover key={label} open withArrow={withArrow} {...look}>
              <PopoverTrigger>
                <Button style={{ width: TRIGGER_WIDTH }}>{label}</Button>
              </PopoverTrigger>
              <PopoverSurface {...surfaceProps}>
                <span style={{ display: 'block', width: CONTENT_WIDTH }}>{label}</span>
              </PopoverSurface>
            </Popover>
          ))}
          {band.length < 4 && <div />}
        </React.Fragment>
      ))}
    </div>
  </>
);
