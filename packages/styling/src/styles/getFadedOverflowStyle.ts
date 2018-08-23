import { IRawStyle } from '@uifabric/merge-styles';
import { getRTL } from '@uifabric/utilities';
import { HighContrastSelector } from './CommonStyles';

export interface IRGB {
  r: number;
  g: number;
  b: number;
}

const DEFAULT_COLOR = '#ffffff';
const DEFAULT_WIDTH = '20px';

/**
 * Generates a style which can be used to gracefully fade out an overflowing content by defining an :after style.
 * Requires the target to have position set to relative and textOverflow set to clip (no ellipsis).
 *
 * @param color - The background color to fade out to.
 * @returns The style object.
 */
export function getFadedOverflowStyle(color: string = DEFAULT_COLOR, width: string = DEFAULT_WIDTH): IRawStyle {
  const isRTL = getRTL();
  const rgbColor: IRGB = hex2rgb(color);
  const rgba = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0)`; // opacity = 0

  return {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'clip',
    selectors: {
      '&:after': {
        content: '""',
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: width,
        pointerEvents: 'none',
        backgroundImage: `linear-gradient(${isRTL ? 'to left' : 'to right'}, ${rgba} 0%, ${color} 100%)`,
        selectors: {
          [HighContrastSelector]: {
            backgroundImage: 'none'
          }
        }
      }
    }
  };
}

/**
 * @param str - Color to be converted from hex to rgba.
 */
function hex2rgb(str: string): IRGB {
  return {
    r: parseInt(str.slice(1, 3), 16),
    g: parseInt(str.slice(3, 5), 16),
    b: parseInt(str.slice(5, 7), 16)
  };
}
