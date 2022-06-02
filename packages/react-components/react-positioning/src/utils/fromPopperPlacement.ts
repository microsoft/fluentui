import type { Variation as PopperAlignment, Placement } from '@popperjs/core';
import type { Alignment, Position } from '../types';
import { parsePopperPlacement } from './parsePopperPlacement';

const positionMap = {
  top: 'above',
  bottom: 'below',
  right: 'after',
  left: 'before',
} as const;

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
 * Maps Popper.js placement to positioning values
 * @see positioningHelper.test.ts for expected placement values
 */
export const fromPopperPlacement = (placement: Placement): { position: Position; alignment?: Alignment } => {
  const { basePlacement, alignment: popperAlignment } = parsePopperPlacement(placement);
  const position = positionMap[basePlacement];
  const alignment = popperAlignment && getAlignmentMap(position)[popperAlignment];

  return { position, alignment };
};
