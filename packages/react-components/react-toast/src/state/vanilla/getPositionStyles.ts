import { ToastOffsetObject, ToastOffset, ToastPosition } from '../types';

interface PositionStyles {
  position: 'fixed';
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export const getPositionStyles = (position: ToastPosition, offset?: ToastOffset) => {
  const positionStyles: PositionStyles = {
    position: 'fixed',
  };

  const offsetStyles: ToastOffsetObject = offset ? (isShorthandOffset(offset) ? offset : offset[position] ?? {}) : {};

  const { horizontal = 0, vertical = 0 } = offsetStyles;

  switch (position) {
    case 'top-left':
      Object.assign(positionStyles, {
        top: vertical,
        left: horizontal,
      });
      break;
    case 'top-right':
      Object.assign(positionStyles, {
        top: vertical,
        right: horizontal,
      });
      break;
    case 'bottom-left':
      Object.assign(positionStyles, {
        bottom: vertical,
        left: horizontal,
      });
      break;
    case 'bottom-right':
      Object.assign(positionStyles, {
        bottom: vertical,
        right: horizontal,
      });
      break;
  }

  return positionStyles;
};

function isShorthandOffset(offset: ToastOffset): offset is ToastOffsetObject {
  return 'horizontal' in offset || 'vertical' in offset;
}
