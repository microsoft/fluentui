import * as React from 'react';

type TooltipLike = React.ComponentType<{
  content: unknown;
  relationship: 'label';
  visible?: boolean;
  withArrow?: boolean;
  appearance?: string;
  positioning?: string;
  children: React.ReactElement;
}>;

type ButtonLike = React.ComponentType<{ children?: React.ReactNode }>;

const placements = ['above', 'below', 'before', 'after', 'above-start', 'below-end'];

/**
 * Pinned-open tooltips (griffel portals / windmod top layer both escape the root, so the
 * runner captures the viewport for this scene). `pin` builds the content value per
 * implementation (windmod needs a manual-popover slot object; hint popovers are exclusive).
 */
export const TooltipVrScene = ({
  Tooltip,
  Button,
  pin,
}: {
  Tooltip: TooltipLike;
  Button: ButtonLike;
  pin: (text: string) => unknown;
}): React.ReactNode => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, max-content)',
      gap: '90px 140px',
      padding: 80,
      background: '#fff',
      width: 1100,
      height: 560,
      boxSizing: 'border-box',
    }}
  >
    {placements.map(positioning => (
      <Tooltip
        key={positioning}
        content={pin(positioning)}
        relationship="label"
        visible
        withArrow
        positioning={positioning}
      >
        <Button>{positioning}</Button>
      </Tooltip>
    ))}
    <Tooltip content={pin('no arrow')} relationship="label" visible>
      <Button>no arrow</Button>
    </Tooltip>
    <Tooltip content={pin('inverted')} relationship="label" visible withArrow appearance="inverted">
      <Button>inverted</Button>
    </Tooltip>
  </div>
);
