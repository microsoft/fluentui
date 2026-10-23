import type { Placement } from '@floating-ui/dom';
import type { Alignment, Position } from '../types';
import { parseFloatingUIPlacement } from './parseFloatingUIPlacement';

/**
 * Maps Floating UI placement to positioning values
 * @see positioningHelper.test.ts for expected placement values
 */
export const fromFloatingUIPlacement = (placement: Placement): { position: Position; alignment?: Alignment } => {
  const { side, alignment: floatingUIAlignment } = parseFloatingUIPlacement(placement);
  const block = side === 'top' || side === 'bottom';
  const position = block ? (side === 'top' ? 'above' : 'below') : side === 'left' ? 'before' : 'after';
  const alignment =
    floatingUIAlignment && (block ? floatingUIAlignment : floatingUIAlignment === 'start' ? 'top' : 'bottom');
  return { position, alignment };
};
