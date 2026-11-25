import type { Alignment, Position, Side } from '../types';

const POSITIONS: Record<Side, Position> = { top: 'above', bottom: 'below', left: 'before', right: 'after' };

/** Maps a computed side and alignment to the values passed to an offset callback. */
export const fromPhysicalPlacement = (
  side: Side,
  alignment?: 'start' | 'end',
): { position: Position; alignment?: Alignment } => ({
  position: POSITIONS[side],
  alignment: alignment && (side === 'top' || side === 'bottom' ? alignment : alignment === 'start' ? 'top' : 'bottom'),
});
