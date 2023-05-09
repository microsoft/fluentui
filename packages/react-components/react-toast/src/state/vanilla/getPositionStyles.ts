import * as React from 'react';
import { ToastPosition } from '../types';

export const getPositionStyles = (position: ToastPosition) => {
  const containerStyles: React.CSSProperties = {
    position: 'fixed',
  };

  let positionStyles: React.CSSProperties = {};
  switch (position) {
    case 'top-left':
      positionStyles = {
        top: 0,
        left: 0,
      };
      break;
    case 'top-right':
      positionStyles = {
        top: 0,
        right: 0,
      };
      break;
    case 'bottom-left':
      positionStyles = {
        bottom: 0,
        left: 0,
      };
      break;
    case 'bottom-right':
      positionStyles = {
        bottom: 0,
        right: 0,
      };
      break;
  }

  Object.assign(containerStyles, positionStyles);
  return containerStyles;
};
