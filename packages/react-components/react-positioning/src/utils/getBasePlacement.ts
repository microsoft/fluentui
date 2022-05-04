import * as PopperJs from '@popperjs/core';

/**
 * Returns the base placement value
 * @param placement - the popper placement (i.e. bottom-start)
 *
 * @returns bottom-start -> bottom
 */
export function getBasePlacement(placement: PopperJs.Placement): PopperJs.BasePlacement {
  return placement.split('-')[0] as PopperJs.BasePlacement;
}
