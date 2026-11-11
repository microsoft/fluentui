import type { ToastOffsetObject, ToastOffset, ToastPosition } from '../types';

interface PositionStyles {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  maxWidth?: string;
}

/**
 * The toast has a fixed width, so on a viewport narrower than that width it would run past the
 * edge. Cap it at the space the offset leaves on both sides.
 *
 * A start or end toast sits `horizontal` away from its edge, so a symmetric gutter of
 * `horizontal` on each side needs `2 * horizontal`. A centered toast is shifted by
 * `horizontal`, and both edges have to stay inside the viewport, which works out to the same
 * `2 * abs(horizontal)`. The floor keeps the default 20px gutter when the offset is smaller.
 */
const getMaxWidth = (horizontal: number): string => {
  return `calc(100% - ${Math.max(2 * Math.abs(horizontal), 40)}px)`;
};

export const getPositionStyles = (
  position: ToastPosition,
  dir: 'rtl' | 'ltr',
  offset?: ToastOffset,
): PositionStyles => {
  const positionStyles: PositionStyles = {};

  const offsetStyles: ToastOffsetObject = offset ? (isShorthandOffset(offset) ? offset : offset[position] ?? {}) : {};

  const centered = position === 'top' || position === 'bottom';

  const { horizontal = centered ? 0 : 20, vertical = 16 } = offsetStyles;
  const start = dir === 'ltr' ? 'left' : 'right';
  const end = dir === 'ltr' ? 'right' : 'left';

  switch (position) {
    case 'top':
      Object.assign(positionStyles, {
        top: vertical,
        left: `calc(50% + ${horizontal}px)`,
        transform: 'translateX(-50%)',
        maxWidth: getMaxWidth(horizontal),
      });
      break;

    case 'bottom':
      Object.assign(positionStyles, {
        bottom: vertical,
        left: `calc(50% + ${horizontal}px)`,
        transform: 'translateX(-50%)',
        maxWidth: getMaxWidth(horizontal),
      });
      break;

    case 'top-start':
      Object.assign(positionStyles, {
        top: vertical,
        [start]: horizontal,
        maxWidth: getMaxWidth(horizontal),
      });
      break;
    case 'top-end':
      Object.assign(positionStyles, {
        top: vertical,
        [end]: horizontal,
        maxWidth: getMaxWidth(horizontal),
      });
      break;
    case 'bottom-start':
      Object.assign(positionStyles, {
        bottom: vertical,
        [start]: horizontal,
        maxWidth: getMaxWidth(horizontal),
      });
      break;
    case 'bottom-end':
      Object.assign(positionStyles, {
        bottom: vertical,
        [end]: horizontal,
        maxWidth: getMaxWidth(horizontal),
      });
      break;
  }

  return positionStyles;
};

function isShorthandOffset(offset: ToastOffset): offset is ToastOffsetObject {
  return 'horizontal' in offset || 'vertical' in offset;
}
