import type { BasePlacement, Placement, Variation } from '@popperjs/core';

/**
 * Parses Popper placement and returns the different components
 * @param placement - the Popper.js placement (i.e. bottom-start)
 *
 * @returns side and alignment components of the placement
 */
export function parsePopperPlacement(placement: Placement): { basePlacement: BasePlacement; alignment: Variation } {
  const tokens = placement.split('-');
  return {
    basePlacement: tokens[0] as BasePlacement,
    alignment: tokens[1] as Variation,
  };
}
