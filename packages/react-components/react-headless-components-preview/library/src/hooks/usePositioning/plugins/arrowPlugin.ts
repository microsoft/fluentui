import { POSITIONS } from '../constants';
import type { PositioningPlugin } from './types';

/**
 * Positions the arrow: it points to the center of the target, and it stays inside the container.
 * Handles `arrowPadding`.
 */
export const arrowPlugin: PositioningPlugin = {
  apply: ({ arrow, placement, anchor, popup, options: { arrowPadding = 0 } }) => {
    if (!arrow || !placement) {
      return;
    }

    const alongX = placement.position === POSITIONS.above || placement.position === POSITIONS.below;
    const arrowSize = alongX ? arrow.offsetWidth : arrow.offsetHeight;
    const [anchorStart, anchorSize, popupStart, popupSize] = alongX
      ? [anchor.left, anchor.width, popup.left, popup.width]
      : [anchor.top, anchor.height, popup.top, popup.height];

    // The padding can't make the arrow leave the center when the container is small
    const padding = Math.min(arrowPadding, popupSize / 2 - arrowSize / 2 - 1);
    const offset = Math.min(
      Math.max(anchorStart + anchorSize / 2 - popupStart - arrowSize / 2, padding),
      popupSize - arrowSize - padding,
    );

    arrow.style.setProperty(alongX ? 'left' : 'top', `${offset}px`);
    arrow.style.removeProperty(alongX ? 'top' : 'left');
  },
};
