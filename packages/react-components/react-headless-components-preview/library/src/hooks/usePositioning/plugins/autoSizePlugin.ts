import { ABOVE, BEFORE, BELOW } from '../constants';
import { resolveOffset } from '../utils';
import type { FallbackPlacement, FallbackRect } from '../fallback/computeFallbackPosition';
import type { PositioningProps } from '../types';

/**
 * Handles `autoSize`: the container doesn't get bigger than the space that is available.
 */
export function applyAutoSize(
  container: HTMLElement,
  placement: FallbackPlacement | null,
  anchor: FallbackRect,
  bounds: FallbackRect,
  rtl: boolean,
  options: PositioningProps,
): void {
  const { autoSize, offset } = options;
  const applyBoth = autoSize === true || autoSize === 'always';
  const applyMaxWidth = applyBoth || autoSize === 'width' || autoSize === 'width-always';
  const applyMaxHeight = applyBoth || autoSize === 'height' || autoSize === 'height-always';

  if (!applyMaxWidth && !applyMaxHeight) {
    return;
  }

  // The placement can't be detected when the container overlaps the target
  const position = placement?.position ?? options.position ?? ABOVE;
  // The margin of the offset is on both sides of the container
  const mainAxis = resolveOffset(offset)[0] * 2;
  const blockMain = position === ABOVE || position === BELOW;
  const boundsRight = bounds.left + bounds.width;
  const boundsBottom = bounds.top + bounds.height;
  // The space between the target (and the offset) and the edge of the bounds on the side of the placement
  const mainSpace =
    position === ABOVE
      ? anchor.top - mainAxis - bounds.top
      : position === BELOW
      ? boundsBottom - (anchor.top + anchor.height + mainAxis)
      : (position === BEFORE) !== rtl
      ? anchor.left - mainAxis - bounds.left
      : boundsRight - (anchor.left + anchor.width + mainAxis);
  const space = {
    width: blockMain ? bounds.width : mainSpace,
    height: blockMain ? mainSpace : bounds.height,
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
