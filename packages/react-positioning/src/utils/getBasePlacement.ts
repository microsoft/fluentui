import * as FloatingUI from '@floating-ui/core';

/**
 * Returns the base placement value
 * @param placement - the popper placement (i.e. bottom-start)
 *
 * @returns bottom-start -> bottom
 */
export function getBasePlacement(placement: FloatingUI.Placement): FloatingUI.BasePlacement {
  return placement.split('-')[0] as FloatingUI.BasePlacement;
}
