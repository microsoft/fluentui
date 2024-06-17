import { ToastOffsetObject, ToastOffset, ToastPosition } from '../types';

interface PositionStyles {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export const getPositionStyles = (position: ToastPosition, dir: 'rtl' | 'ltr', offset?: ToastOffset) => {
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
      });
      break;

    case 'bottom':
      Object.assign(positionStyles, {
        bottom: vertical,
        left: `calc(50% + ${horizontal}px)`,
        transform: 'translateX(-50%)',
      });
      break;

    case 'top-start':
      Object.assign(positionStyles, {
        top: vertical,
        [start]: horizontal,
      });
      break;
    case 'top-end':
      Object.assign(positionStyles, {
        top: vertical,
        [end]: horizontal,
      });
      break;
    case 'bottom-start':
      Object.assign(positionStyles, {
        bottom: vertical,
        [start]: horizontal,
      });
      break;
    case 'bottom-end':
      Object.assign(positionStyles, {
        bottom: vertical,
        [end]: horizontal,
      });
      break;
  }

  return positionStyles;
};

function isShorthandOffset(offset: ToastOffset): offset is ToastOffsetObject {
  return 'horizontal' in offset || 'vertical' in offset;
}
