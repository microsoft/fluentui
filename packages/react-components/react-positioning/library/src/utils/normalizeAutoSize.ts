import type { NormalizedAutoSize, PositioningOptions } from '../types';

/**
 * AutoSizes contains many options from historic implementation.
 * Now options 'always'/'height-always'/'width-always' are obsolete.
 * This function maps them to true/'height'/'width'
 */
export const normalizeAutoSize = (autoSize?: PositioningOptions['autoSize']): NormalizedAutoSize | false => {
  const dimensions = getAutoSizeDimensions(autoSize);
  return dimensions.length
    ? {
        applyMaxWidth: dimensions.includes('width'),
        applyMaxHeight: dimensions.includes('height'),
      }
    : false;
};

export function getAutoSizeDimensions(autoSize?: PositioningOptions['autoSize']): ('width' | 'height')[] {
  switch (autoSize) {
    case 'always':
    case true:
      return ['width', 'height'];

    case 'width-always':
    case 'width':
      return ['width'];

    case 'height-always':
    case 'height':
      return ['height'];

    default:
      return [];
  }
}
