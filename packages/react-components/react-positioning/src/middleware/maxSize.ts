import { size } from '@floating-ui/dom';
import type { Middleware } from '@floating-ui/dom';
import type { PositioningOptions } from '../types';
import { getBoundary } from '../utils/getBoundary';
export interface MaxSizeMiddlewareOptions extends Pick<PositioningOptions, 'overflowBoundary'> {
  container: HTMLElement | null;
}

type SimplifiedAutoSize = boolean | 'height' | 'width';
/**
 * AutoSizes contains many options from historic implementation.
 * Now options 'always'/'height-always'/'width-always' are obsolete.
 * This function maps them to true/'height'/'width'
 */
const getSimplifiedAutoSize = (autoSize?: PositioningOptions['autoSize']): SimplifiedAutoSize | undefined =>
  autoSize === 'always'
    ? true
    : autoSize === 'height-always'
    ? 'height'
    : autoSize === 'width-always'
    ? 'width'
    : autoSize;

const CSS_VAR_BOX_SIZING = '--maxsize-box-sizing';
const CSS_VAR_AVAILABLE_WIDTH = '--maxsize-available-width';
const CSS_VAR_AVAILABLE_HEIGHT = '--maxsize-available-height';
const CSS_VAR_OVERFLOW_X = '--maxsize-overflow-x';
const CSS_VAR_OVERFLOW_Y = '--maxsize-overflow-y';

export const resetMaxSizeStyles = (floatingElementStyle: CSSStyleDeclaration) => {
  if (floatingElementStyle.boxSizing === `var(${CSS_VAR_BOX_SIZING})`) {
    floatingElementStyle.removeProperty(CSS_VAR_BOX_SIZING);
    floatingElementStyle.removeProperty('box-sizing');
  }

  if (floatingElementStyle.maxWidth === `var(${CSS_VAR_AVAILABLE_WIDTH})`) {
    floatingElementStyle.removeProperty('max-width');
    floatingElementStyle.removeProperty(CSS_VAR_AVAILABLE_WIDTH);
    if (floatingElementStyle.width === `var(${CSS_VAR_AVAILABLE_WIDTH})`) {
      floatingElementStyle.removeProperty('width');
    }
  }

  if (floatingElementStyle.maxHeight === `var(${CSS_VAR_AVAILABLE_HEIGHT})`) {
    floatingElementStyle.removeProperty('max-height');
    floatingElementStyle.removeProperty(CSS_VAR_AVAILABLE_HEIGHT);
    if (floatingElementStyle.height === `var(${CSS_VAR_AVAILABLE_HEIGHT})`) {
      floatingElementStyle.removeProperty('height');
    }
  }

  if (floatingElementStyle.overflowX === `var(${CSS_VAR_OVERFLOW_X})`) {
    floatingElementStyle.removeProperty('overflow-x');
  }
  if (floatingElementStyle.overflowY === `var(${CSS_VAR_OVERFLOW_Y})`) {
    floatingElementStyle.removeProperty('overflow-y');
  }
};

export function maxSize(autoSize: PositioningOptions['autoSize'], options: MaxSizeMiddlewareOptions): Middleware {
  const { container, overflowBoundary } = options;
  return size({
    ...(overflowBoundary && { altBoundary: true, boundary: getBoundary(container, overflowBoundary) }),
    apply({ availableHeight, availableWidth, elements, rects }) {
      const simplifiedAutoSize = getSimplifiedAutoSize(autoSize);
      if (simplifiedAutoSize) {
        elements.floating.style.setProperty(CSS_VAR_BOX_SIZING, 'border-box');
        elements.floating.style.setProperty('box-sizing', `var(${CSS_VAR_BOX_SIZING})`);
      }

      const applyMaxWidth = simplifiedAutoSize === true || simplifiedAutoSize === 'width';
      const widthOverflow = rects.floating.width > availableWidth;

      const applyMaxHeight = simplifiedAutoSize === true || simplifiedAutoSize === 'height';
      const heightOverflow = rects.floating.height > availableHeight;

      if (applyMaxWidth) {
        elements.floating.style.setProperty(CSS_VAR_AVAILABLE_WIDTH, `${availableWidth}px`);
        elements.floating.style.setProperty('max-width', `var(${CSS_VAR_AVAILABLE_WIDTH})`);
        if (widthOverflow) {
          elements.floating.style.setProperty('width', `var(${CSS_VAR_AVAILABLE_WIDTH})`);
          elements.floating.style.setProperty(CSS_VAR_OVERFLOW_X, 'auto');
          elements.floating.style.setProperty('overflow-x', `var(${CSS_VAR_OVERFLOW_X})`);
        }
      }

      if (applyMaxHeight) {
        elements.floating.style.setProperty(CSS_VAR_AVAILABLE_HEIGHT, `${availableHeight}px`);
        elements.floating.style.setProperty('max-height', `var(${CSS_VAR_AVAILABLE_HEIGHT})`);
        if (heightOverflow) {
          elements.floating.style.setProperty('height', `var(${CSS_VAR_AVAILABLE_HEIGHT})`);
          elements.floating.style.setProperty(CSS_VAR_OVERFLOW_Y, 'auto');
          elements.floating.style.setProperty('overflow-y', `var(${CSS_VAR_OVERFLOW_Y})`);
        }
      }
    },
  });
}
