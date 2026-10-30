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

export const getAutoSizeDimensions = (autoSize?: PositioningOptions['autoSize']): ('width' | 'height')[] => {
  // 'width-always' and 'height-always' are obsolete aliases of 'width' and 'height'
  const dimension = /^(width|height)(-always)?$/.exec(String(autoSize));
  return autoSize === true || autoSize === 'always' ? ['width', 'height'] : dimension ? [dimension[1] as 'width'] : [];
};
