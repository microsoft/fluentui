import type { Side, Placement, Alignment } from '@floating-ui/dom';

/**
 * Parses Floating UI placement and returns the different components
 * @param placement - the floating ui placement (i.e. bottom-start)
 *
 * @returns side and alignment components of the placement
 */
export function parseFloatingUIPlacement(placement: Placement): { side: Side; alignment: Alignment } {
  const tokens = placement.split('-');
  return {
    side: tokens[0] as Side,
    alignment: tokens[1] as Alignment,
  };
}
