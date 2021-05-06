import { pxToRem, SizeValue } from '../../../../utils';
import { loaderSvgDataUrl } from './loaderSvgDataUrl';

export interface LoaderVariables {
  containerHeights: Record<SizeValue, string>;
  containerWidths: Record<SizeValue, string>;

  svgContent: string;
  svgHeights: Record<SizeValue, string>;
  svgTranslatePosition: Record<SizeValue, string>;
  svgWidths: Record<SizeValue, string>;
}

export const loaderVariables = (): LoaderVariables => ({
  containerHeights: {
    smallest: pxToRem(24),
    smaller: pxToRem(24),
    small: pxToRem(24),
    medium: pxToRem(36),
    large: pxToRem(72),
    larger: pxToRem(72),
    largest: pxToRem(72),
  },
  containerWidths: {
    smallest: pxToRem(24),
    smaller: pxToRem(24),
    small: pxToRem(24),
    medium: pxToRem(36),
    large: pxToRem(72),
    larger: pxToRem(72),
    largest: pxToRem(72),
  },

  svgContent: loaderSvgDataUrl,
  svgHeights: {
    smaller: pxToRem(1464),
    smallest: pxToRem(1464),
    small: pxToRem(1464),
    medium: pxToRem(2196),
    large: pxToRem(4392),
    larger: pxToRem(4392),
    largest: pxToRem(4392),
  },
  svgTranslatePosition: {
    smallest: pxToRem(-1440),
    smaller: pxToRem(-1440),
    small: pxToRem(-1440),
    medium: pxToRem(-2160),
    large: pxToRem(-4320),
    larger: pxToRem(-4320),
    largest: pxToRem(-4320),
  },
  svgWidths: {
    smallest: pxToRem(24),
    smaller: pxToRem(24),
    small: pxToRem(24),
    medium: pxToRem(36),
    large: pxToRem(72),
    larger: pxToRem(72),
    largest: pxToRem(72),
  },
});
