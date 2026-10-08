import type { PositioningProps } from '../types';
import type { FallbackPlacement, FallbackRect } from '../fallback/computeFallbackPosition';
import type { PositioningTarget } from '../types';
import { ABOVE, BEFORE, BELOW } from '../constants';
import { getClippingRect } from './geometry';

type PositioningEndDetail = Parameters<NonNullable<PositioningProps['onPositioningEnd']>>[0]['detail'];

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
export function applyVisibility(
  container: HTMLElement,
  target: PositioningTarget,
  rtl: boolean,
  placement: FallbackPlacement | null,
  anchor: FallbackRect,
  popup: FallbackRect,
  onPositioningEnd: PositioningProps['onPositioningEnd'],
): void {
  // Virtual elements are clipped like the element that they are in
  const element = ('nodeType' in target ? target : target.contextElement) ?? container;
  const clip = getClippingRect(element);
  const referenceHidden = isClipped(anchor, clip);
  const escaped = isClipped(popup, clip);

  container.toggleAttribute(DATA_POSITIONING_HIDDEN, referenceHidden);
  container.toggleAttribute(DATA_POSITIONING_ESCAPED, escaped);

  if (onPositioningEnd && placement) {
    const { position, align } = placement;
    const side =
      position === ABOVE ? 'top' : position === BELOW ? 'bottom' : (position === BEFORE) !== rtl ? 'left' : 'right';

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
