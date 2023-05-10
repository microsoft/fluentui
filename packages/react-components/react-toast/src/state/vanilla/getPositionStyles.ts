import { ToastPosition } from '../types';

interface PositionStyles {
  position: 'fixed';
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export const getPositionStyles = (position: ToastPosition) => {
  const positionStyles: PositionStyles = {
    position: 'fixed',
  };

  switch (position) {
    case 'top-left':
      Object.assign(positionStyles, {
        top: 0,
        left: 0,
      });
      break;
    case 'top-right':
      Object.assign(positionStyles, {
        top: 0,
        right: 0,
      });
      break;
    case 'bottom-left':
      Object.assign(positionStyles, {
        bottom: 0,
        left: 0,
      });
      break;
    case 'bottom-right':
      Object.assign(positionStyles, {
        bottom: 0,
        right: 0,
      });
      break;
  }

  return positionStyles;
};
