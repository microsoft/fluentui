import type { TargetElement } from '../types';
import type { PlacementRect } from './computePlacement';
import { getClippingRect } from './geometry';

export type Visibility = {
  /** The target is not visible */
  referenceHidden: boolean;
  /** The container is not visible */
  escaped: boolean;
  /** The container overlaps the top or the bottom edge of the area where the target is visible */
  intersecting: boolean;
};

/** Whether one of the sides of the rect is completely outside of the clipping rect */
const isClipped = (rect: PlacementRect, clip: PlacementRect): boolean =>
  rect.left + rect.width <= clip.left ||
  rect.left >= clip.left + clip.width ||
  rect.top + rect.height <= clip.top ||
  rect.top >= clip.top + clip.height;

/**
 * Computes what is visible after the container is positioned.
 */
export function getVisibility(
  container: HTMLElement,
  target: TargetElement,
  anchor: PlacementRect,
  popup: PlacementRect,
): Visibility {
  // Virtual elements are clipped like the element that they are in
  const element = ('nodeType' in target ? target : target.contextElement) ?? container;
  const clip = getClippingRect(element);
  const overflowTop = clip.top - popup.top;
  const overflowBottom = popup.top + popup.height - (clip.top + clip.height);

  return {
    referenceHidden: isClipped(anchor, clip),
    escaped: isClipped(popup, clip),
    intersecting:
      (overflowTop > 0 && overflowTop < popup.height) || (overflowBottom > 0 && overflowBottom < popup.height),
  };
}
