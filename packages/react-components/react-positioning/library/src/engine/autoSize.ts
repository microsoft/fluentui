import type { NormalizedAutoSize } from '../types';
import type { Placement, PlacementRect } from './computePlacement';

/**
 * Removes the styles of the previous update, so the container is measured with its natural size.
 */
export function resetAutoSize(container: HTMLElement, { applyMaxWidth, applyMaxHeight }: NormalizedAutoSize): void {
  if (applyMaxWidth) {
    container.style.removeProperty('max-width');
  }
  if (applyMaxHeight) {
    container.style.removeProperty('max-height');
  }
  container.style.removeProperty('box-sizing');
}

/**
 * Handles `autoSize`: the container doesn't get bigger than the space that is available.
 * @param mainAxis - offset between the target and the container, it's on both sides of the container
 */
export function applyAutoSize(
  container: HTMLElement,
  { applyMaxWidth, applyMaxHeight }: NormalizedAutoSize,
  placement: Placement,
  anchor: PlacementRect,
  bounds: PlacementRect,
  rtl: boolean,
  mainAxis: number,
): void {
  const { position } = placement;
  const blockMain = position === 'above' || position === 'below';
  const boundsRight = bounds.left + bounds.width;
  const boundsBottom = bounds.top + bounds.height;
  const margin = mainAxis * 2;
  // The space between the target (and the offset) and the edge of the bounds on the side of the placement
  const mainSpace =
    position === 'above'
      ? anchor.top - margin - bounds.top
      : position === 'below'
      ? boundsBottom - (anchor.top + anchor.height + margin)
      : (position === 'before') !== rtl
      ? anchor.left - margin - bounds.left
      : boundsRight - (anchor.left + anchor.width + margin);
  const space = {
    width: Math.max(0, blockMain ? bounds.width : mainSpace),
    height: Math.max(0, blockMain ? mainSpace : bounds.height),
  };

  (['width', 'height'] as const).forEach(dimension => {
    if (!(dimension === 'width' ? applyMaxWidth : applyMaxHeight)) {
      return;
    }

    container.style.setProperty('box-sizing', 'border-box');
    container.style.setProperty(`max-${dimension}`, `${space[dimension]}px`);

    const overflow = dimension === 'width' ? 'overflow-x' : 'overflow-y';
    if (
      (dimension === 'width' ? container.scrollWidth : container.scrollHeight) > space[dimension] &&
      !container.style.getPropertyValue(overflow)
    ) {
      container.style.setProperty(overflow, 'auto');
    }
  });
}
