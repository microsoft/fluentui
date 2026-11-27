import type { ToastOffsetObject, ToastOffset, ToastPosition } from '../types';

/**
 * Custom property that carries the width cap to the styles of the Toaster.
 */
export const toasterMaxWidthVar = '--fui-Toaster--max-width';

interface PositionStyles {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  [toasterMaxWidthVar]?: string;
}

/**
 * Horizontal offset of the start and end positions when none is configured. The width cap keeps the same space
 * free at the edge of the container.
 */
const DEFAULT_HORIZONTAL_OFFSET = 20;

/**
 * The Toaster has a fixed width, so a container that is narrower than that width plus the offset would cut it
 * off. The cap is the width of the container minus the space that has to stay free.
 *
 * A start or end Toaster sits `horizontal` away from its own edge and keeps the default gutter free at the other
 * edge. A centered Toaster is moved by `horizontal`, which moves both of its edges, so it keeps the gutter and the
 * distance it moved free on both sides.
 *
 * The cap is applied to `width` through a custom property and not as `max-width`, so that a `max-width` that the
 * caller sets through `style` or `className` still applies.
 */
const getMaxWidth = (horizontal: number, centered: boolean): string => {
  const reserved = centered
    ? 2 * (Math.abs(horizontal) + DEFAULT_HORIZONTAL_OFFSET)
    : Math.max(horizontal, 0) + DEFAULT_HORIZONTAL_OFFSET;

  return `calc(100% - ${reserved}px)`;
};

export const getPositionStyles = (
  position: ToastPosition,
  dir: 'rtl' | 'ltr',
  offset?: ToastOffset,
): PositionStyles => {
  const positionStyles: PositionStyles = {};

  const offsetStyles: ToastOffsetObject = offset ? (isShorthandOffset(offset) ? offset : offset[position] ?? {}) : {};

  const centered = position === 'top' || position === 'bottom';

  const { horizontal = centered ? 0 : DEFAULT_HORIZONTAL_OFFSET, vertical = 16 } = offsetStyles;
  const maxWidth = getMaxWidth(horizontal, centered);
  const start = dir === 'ltr' ? 'left' : 'right';
  const end = dir === 'ltr' ? 'right' : 'left';

  switch (position) {
    case 'top':
      Object.assign(positionStyles, {
        top: vertical,
        left: `calc(50% + ${horizontal}px)`,
        transform: 'translateX(-50%)',
        [toasterMaxWidthVar]: maxWidth,
      });
      break;

    case 'bottom':
      Object.assign(positionStyles, {
        bottom: vertical,
        left: `calc(50% + ${horizontal}px)`,
        transform: 'translateX(-50%)',
        [toasterMaxWidthVar]: maxWidth,
      });
      break;

    case 'top-start':
      Object.assign(positionStyles, {
        top: vertical,
        [start]: horizontal,
        [toasterMaxWidthVar]: maxWidth,
      });
      break;
    case 'top-end':
      Object.assign(positionStyles, {
        top: vertical,
        [end]: horizontal,
        [toasterMaxWidthVar]: maxWidth,
      });
      break;
    case 'bottom-start':
      Object.assign(positionStyles, {
        bottom: vertical,
        [start]: horizontal,
        [toasterMaxWidthVar]: maxWidth,
      });
      break;
    case 'bottom-end':
      Object.assign(positionStyles, {
        bottom: vertical,
        [end]: horizontal,
        [toasterMaxWidthVar]: maxWidth,
      });
      break;
  }

  return positionStyles;
};

function isShorthandOffset(offset: ToastOffset): offset is ToastOffsetObject {
  return 'horizontal' in offset || 'vertical' in offset;
}
