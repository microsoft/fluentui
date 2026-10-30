import type { Placement, Side } from '@floating-ui/dom';
import type { Alignment, Position } from '../types';

const POSITIONS: Record<Side, Position> = { top: 'above', bottom: 'below', left: 'before', right: 'after' };

/** Maps the side and the alignment of a Floating UI placement to positioning values */
export const toPositioningValues = (side: Side, alignment?: string): { position: Position; alignment?: Alignment } => ({
  position: POSITIONS[side],
  alignment: (alignment &&
    (side === 'top' || side === 'bottom' ? alignment : alignment === 'start' ? 'top' : 'bottom')) as Alignment,
});

/**
 * Maps Floating UI placement to positioning values
 * @see positioningHelper.test.ts for expected placement values
 */
export const fromFloatingUIPlacement = (placement: Placement): { position: Position; alignment?: Alignment } =>
  toPositioningValues(...(placement.split('-') as [Side, string?]));
