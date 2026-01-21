import type { PositioningPlacement } from './types';

/**
 * Calculates the slide offsets for positioning-based slide animations.
 *
 * The returned `{ x, y }` values represent the starting offset from which an element
 * slides into its final position. For example, when placement is 'top' (element appears
 * above the target), the element slides from below (positive Y).
 *
 * @param placement - The positioning placement to calculate slide offsets for
 * @param distance - The slide distance value (with units)
 * @returns The x and y offset values for the slide animation
 */
export function getSlideOffsets({
  placement,
  distance,
}: {
  placement: PositioningPlacement | null;
  distance: string;
}): { x: string; y: string } {
  if (!placement) {
    return { x: '0px', y: '0px' };
  }

  const basePlacement = placement.split('-')[0];

  switch (basePlacement) {
    case 'top':
      // Element is above target, slides from below (positive Y)
      return { x: '0px', y: distance };
    case 'bottom':
      // Element is below target, slides from above (negative Y)
      return { x: '0px', y: `-${distance}` };
    case 'left':
      // Element is to the left, slides from right (positive X)
      return { x: distance, y: '0px' };
    case 'right':
      // Element is to the right, slides from left (negative X)
      return { x: `-${distance}`, y: '0px' };
    default:
      // Unknown placement - return zero offset (no slide animation)
      return { x: '0px', y: '0px' };
  }
}
