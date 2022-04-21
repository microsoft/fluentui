import type { BasePlacement, Variation as PopperAlignment, Placement } from '@popperjs/core';
import type { Alignment, Position } from '../types';
import { parsePopperPlacement } from './parsePopperPlacement';

const getPositionMap = (): Record<BasePlacement, Position> => ({
  top: 'above',
  bottom: 'below',
  right: 'after',
  left: 'before',
});

const getAlignmentMap = (position: Position): Record<PopperAlignment, Alignment> => {
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
export const fromPopperPlacement = (placement: Placement): { position: Position; alignment?: Alignment } => {
  const { basePlacement, alignment: popperAlignment } = parsePopperPlacement(placement);
  const position = getPositionMap()[basePlacement];
  const alignment = popperAlignment && getAlignmentMap(position)[popperAlignment];

  return { position, alignment };
};
