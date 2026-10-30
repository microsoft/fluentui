import type { PositioningProps } from '../types';
import { ABOVE, BEFORE, BELOW, END, START } from '../constants';
import type { ComputePositionReturn } from './computePosition';
import type { Rect } from './geometry';
import { getClippingRect } from './geometry';

type PositioningEndDetail = Parameters<NonNullable<PositioningProps['onPositioningEnd']>>[0]['detail'];

// The attributes that `@fluentui/react-positioning` sets, both paths can be styled the same way
export const DATA_POSITIONING_HIDDEN = 'data-popper-reference-hidden';
export const DATA_POSITIONING_ESCAPED = 'data-popper-escaped';

/** Whether one of the sides of the rect is completely outside of the clipping rect */
const isClipped = (rect: Rect, clip: Rect): boolean =>
  rect.left + rect.width <= clip.left ||
  rect.left >= clip.left + clip.width ||
  rect.top + rect.height <= clip.top ||
  rect.top >= clip.top + clip.height;

/**
 * Sets the `data-popper-reference-hidden` (the target is not visible) and `data-popper-escaped` (the container is not
 * visible) attributes, and calls `onPositioningEnd`. Used with CSS anchor positioning, `@fluentui/react-positioning`
 * does the same when it positions the container.
 */
export function applyVisibility(
  container: HTMLElement,
  target: HTMLElement,
  placement: ComputePositionReturn | null,
  rtl: boolean,
  onPositioningEnd: PositioningProps['onPositioningEnd'],
): void {
  const clip = getClippingRect(target);
  const referenceHidden = isClipped(target.getBoundingClientRect(), clip);
  const escaped = isClipped(container.getBoundingClientRect(), clip);

  container.toggleAttribute(DATA_POSITIONING_HIDDEN, referenceHidden);
  container.toggleAttribute(DATA_POSITIONING_ESCAPED, escaped);

  if (onPositioningEnd && placement) {
    const { position } = placement;
    const blockPosition = position === ABOVE || position === BELOW;
    // The placement is detected from the rects so it's physical, the alignment of Floating UI placements is logical
    const swap = blockPosition && rtl;
    const align = swap && placement.align === START ? END : swap && placement.align === END ? START : placement.align;
    const side = position === ABOVE ? 'top' : position === BELOW ? 'bottom' : position === BEFORE ? 'left' : 'right';

    onPositioningEnd(
      new CustomEvent<PositioningEndDetail>('fui-positioningend', {
        detail: {
          placement: (align === 'center' ? side : `${side}-${align}`) as PositioningEndDetail['placement'],
          escaped,
          referenceHidden,
        },
      }),
    );
  }
}
