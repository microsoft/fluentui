import type { Side, Alignment as FloatingUIAlignment, Placement } from '@floating-ui/dom';
import type { Alignment, Position } from '../types';
import { parseFloatingUIPlacement } from './parseFloatingUIPlacement';

const getPositionMap = (): Record<Side, Position> => ({
  top: 'above',
  bottom: 'below',
  right: 'after',
  left: 'before',
});

// Floating UI automatically flips alignment
// https://github.com/floating-ui/floating-ui/issues/1563
const getAlignmentMap = (position: Position): Record<FloatingUIAlignment, Alignment> => {
  if (position === 'above' || position === 'below') {
    return {
      start: 'start',
      end: 'end',
    };
  }

  return {
    start: 'top',
    end: 'bottom',
  };
};

/**
 * Maps Floating UI placement to positioning values
 * @see positioningHelper.test.ts for expected placement values
 */
export const fromFloatingUIPlacement = (placement: Placement): { position: Position; alignment?: Alignment } => {
  const { side, alignment: floatingUIAlignment } = parseFloatingUIPlacement(placement);
  const position = getPositionMap()[side];
  const alignment = floatingUIAlignment && getAlignmentMap(position)[floatingUIAlignment];

  return { position, alignment };
};
