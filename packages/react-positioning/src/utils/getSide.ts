import type { Side, Placement } from '@floating-ui/dom';

/**
 * Returns the base placement value
 * @param placement - the popper placement (i.e. bottom-start)
 *
 * @returns bottom-start -> bottom
 */
export function getSide(placement: Placement): Side {
  return placement.split('-')[0] as Side;
}
