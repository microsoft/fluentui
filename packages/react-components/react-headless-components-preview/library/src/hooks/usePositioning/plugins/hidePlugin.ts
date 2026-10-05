import type { ExtendedPositioningProps } from '../types';
import type { FallbackRect } from '../fallback/computeFallbackPosition';
import { POSITIONS } from '../constants';
import { getClippingRect } from './geometry';
import type { PositioningPlugin } from './types';

type PositioningEndDetail = Parameters<NonNullable<ExtendedPositioningProps['onPositioningEnd']>>[0]['detail'];

export const DATA_POSITIONING_HIDDEN = 'data-positioning-hidden';
export const DATA_POSITIONING_ESCAPED = 'data-positioning-escaped';

/** Whether one of the sides of the rect is completely outside of the clipping rect */
const isClipped = (rect: FallbackRect, clip: FallbackRect): boolean =>
  rect.left + rect.width <= clip.left ||
  rect.left >= clip.left + clip.width ||
  rect.top + rect.height <= clip.top ||
  rect.top >= clip.top + clip.height;

/**
 * Sets the `data-positioning-hidden` (the target is not visible) and `data-positioning-escaped` (the container is not
 * visible) attributes, and calls `onPositioningEnd`.
 */
export const hidePlugin: PositioningPlugin = {
  apply: ({ container, target, rtl, placement, anchor, popup, options: { onPositioningEnd } }) => {
    // Virtual elements are clipped like the element that they are in
    const element = 'nodeType' in target ? target : target.contextElement;
    const clip = element ? getClippingRect(element) : getClippingRect(container);
    const referenceHidden = isClipped(anchor, clip);
    const escaped = isClipped(popup, clip);

    container.toggleAttribute(DATA_POSITIONING_HIDDEN, referenceHidden);
    container.toggleAttribute(DATA_POSITIONING_ESCAPED, escaped);

    if (onPositioningEnd && placement) {
      const { position, align } = placement;
      const side =
        position === POSITIONS.above
          ? 'top'
          : position === POSITIONS.below
          ? 'bottom'
          : (position === POSITIONS.before) !== rtl
          ? 'left'
          : 'right';

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
  },
};
