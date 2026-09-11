// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

type Layout = 'spread' | 'stack' | 'pie';
type Size = 16 | 20 | 24 | 32 | 40 | 56 | 72 | 96;

export type AvatarGroupFamily = {
  AvatarGroup: React.ComponentType<{ layout?: Layout; size?: Size; children?: React.ReactNode }>;
  AvatarGroupItem: React.ComponentType<{ name?: string }>;
  AvatarGroupPopover: React.ComponentType<{
    open?: boolean;
    indicator?: 'count' | 'icon';
    popoverSurface?: Record<string, unknown>;
    children: React.ReactNode;
  }>;
  /** windmod only — a pinned-open popover has to opt out of the mutually exclusive hint stack. */
  surfaceProps?: Record<string, unknown>;
};

/** One roster, shared by both sides, so no cell can differ by its content. */
const NAMES = [
  'Katri Athokas',
  'Elvia Atkins',
  'Cameron Evans',
  'Wanda Howard',
  'Mona Kane',
  'Allan Munger',
  'Daisy Phillips',
  'Robert Tolbert',
  'Celeste Burton',
  'Kevin Sturgis',
  'Charlotte Waltson',
];

const frame: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 40,
  padding: 32,
  background: '#ffffff',
  fontSize: 0,
  lineHeight: 0,
  textAlign: 'left',
  width: 1180,
  boxSizing: 'border-box',
};

type Cell = {
  layout?: Layout;
  size?: Size;
  /** Items rendered inline. */
  inline: number;
  /** Items rendered inside the overflow popover; zero means no popover at all. */
  overflow?: number;
  indicator?: 'count' | 'icon';
};

const renderCell = (
  { AvatarGroup, AvatarGroupItem, AvatarGroupPopover }: AvatarGroupFamily,
  cell: Cell,
  index: number,
): React.ReactNode => {
  const inline = NAMES.slice(0, cell.inline);
  const overflow = NAMES.slice(cell.inline, cell.inline + (cell.overflow ?? 0));

  return (
    <AvatarGroup key={index} layout={cell.layout} size={cell.size}>
      {inline.map(name => (
        <AvatarGroupItem key={name} name={name} />
      ))}
      {overflow.length > 0 && (
        <AvatarGroupPopover indicator={cell.indicator}>
          {overflow.map(name => (
            <AvatarGroupItem key={name} name={name} />
          ))}
        </AvatarGroupPopover>
      )}
    </AvatarGroup>
  );
};

/**
 * Twenty closed cells: the three layouts across every ladder boundary, the pie's three
 * `nth-of-type` geometries plus the no-match case, and the six overflow-trigger cells that pin the
 * size-keyed indicator default. Nothing here opens a surface, so the scene carries no filtered
 * box, no top-layer element and no positioned surface — it gates at strict zero.
 *
 * Hover, active and the open/selected trigger look are deliberately absent: forced pseudo-states
 * are not in the harness yet, and a stub class would test the stub. The computed-style probe in
 * `.scratch/windmod-loop/avatar-group-impl/` is the enforcing check for those.
 */
const cells: Cell[] = [
  { layout: 'spread', size: 16, inline: 6 },
  { layout: 'spread', size: 24, inline: 6 },
  { layout: 'spread', inline: 6 },
  { layout: 'spread', size: 96, inline: 6 },
  { layout: 'stack', size: 20, inline: 6 },
  { layout: 'stack', size: 32, inline: 6 },
  { layout: 'stack', size: 56, inline: 6 },
  { layout: 'stack', size: 72, inline: 6 },
  { layout: 'stack', size: 96, inline: 6 },
  { layout: 'pie', size: 32, inline: 2 },
  { layout: 'pie', size: 32, inline: 3 },
  { layout: 'pie', size: 32, inline: 4 },
  { layout: 'pie', size: 56, inline: 3 },
  { layout: 'pie', size: 96, inline: 3 },
  { layout: 'spread', size: 16, inline: 3, overflow: 3 },
  { layout: 'spread', size: 20, inline: 3, overflow: 3 },
  { layout: 'spread', size: 24, inline: 3, overflow: 3 },
  { layout: 'stack', size: 40, inline: 3, overflow: 3 },
  { layout: 'spread', size: 72, inline: 3, overflow: 3, indicator: 'icon' },
  { layout: 'pie', size: 32, inline: 3, overflow: 3 },
];

export const AvatarGroupVrScene = (family: AvatarGroupFamily): React.ReactNode => (
  <div style={frame}>{cells.map((cell, index) => renderCell(family, cell, index))}</div>
);

/**
 * Eight cells under `dir="rtl"`. Cells 3-5 are the flagship: windmod replaces Griffel's JS `dir`
 * read and its second class set with one `@variant rtl` block, and only the mirrored pie
 * clip-paths can catch a transcription error.
 */
const rtlCells: Cell[] = [
  { layout: 'spread', size: 32, inline: 6 },
  { layout: 'stack', size: 32, inline: 6 },
  { layout: 'pie', size: 32, inline: 2 },
  { layout: 'pie', size: 32, inline: 3 },
  { layout: 'pie', size: 96, inline: 3 },
  { layout: 'spread', size: 32, inline: 3, overflow: 3 },
  { layout: 'stack', size: 56, inline: 3, overflow: 3 },
  { layout: 'pie', size: 32, inline: 3, overflow: 3 },
];

export const AvatarGroupRtlVrScene = (family: AvatarGroupFamily): React.ReactNode => (
  <div style={frame}>{rtlCells.map((cell, index) => renderCell(family, cell, index))}</div>
);

/**
 * One cell, captured against the viewport: the only scene that renders the overflow surface.
 *
 * EIGHT overflow items, not three. The surface's own block sets `max-height: 220px`,
 * `min-height: 80px` and `overflow: hidden scroll`, and at three items none of the three
 * constraints binds — the box never clips, never stretches and never scrolls, so the flagged
 * behaviour would not be in the captured set at all.
 *
 * The trigger sits away from the viewport edges deliberately. The one residue term here is the
 * drop shadow's rasterization under `position: fixed` (UA-forced on `[popover]`) against Griffel's
 * portaled `position: absolute`, and that term is position-dependent by a factor of four; the
 * placement puts the surface in the measured-cheap region rather than near an edge.
 */
export const AvatarGroupOpenVrScene = ({
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  surfaceProps,
}: AvatarGroupFamily): React.ReactNode => (
  <>
    {/* The surface carries tabIndex 0 from the hook's defaults on both sides, and opening it
        focuses it; with no prior pointer interaction the browser resolves :focus-visible to true
        and paints a UA ring. The resting appearance is what this scene captures. */}
    <style>{`
      [data-popover-surface]:focus-visible, [data-popover-surface]:focus,
      .fui-PopoverSurface:focus-visible, .fui-PopoverSurface:focus { outline: none; }
      [data-fui-focus-visible]::after { display: none; }
    `}</style>
    <div style={{ width: 1280, height: 720, background: '#fff', boxSizing: 'border-box', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 560, top: 470, fontSize: 0, lineHeight: 0 }}>
        <AvatarGroup layout="spread" size={32}>
          {NAMES.slice(0, 3).map(name => (
            <AvatarGroupItem key={name} name={name} />
          ))}
          <AvatarGroupPopover open popoverSurface={surfaceProps}>
            {NAMES.slice(3, 11).map(name => (
              <AvatarGroupItem key={name} name={name} />
            ))}
          </AvatarGroupPopover>
        </AvatarGroup>
      </div>
    </div>
  </>
);
