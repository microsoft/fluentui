import { pxToRem, SizeValue } from '../../../../utils';

export interface LoaderVariables {
  containerHeights: Record<SizeValue, string>;
  containerWidths: Record<SizeValue, string>;

  svgHeights: Record<SizeValue, string>;
  svgTranslatePosition: Record<SizeValue, string>;
  svgWidths: Record<SizeValue, string>;
  svgTrackColor: string;
  svgTailColor: string;
  svgSecondaryColor: string;
}

export const loaderVariables = (siteVariables: any): LoaderVariables => ({
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

  svgHeights: {
    smallest: pxToRem(24),
    smaller: pxToRem(24),
    small: pxToRem(24),
    medium: pxToRem(36),
    large: pxToRem(72),
    larger: pxToRem(72),
    largest: pxToRem(72),
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
  svgTrackColor: siteVariables.colorScheme.brand.border2,
  svgTailColor: siteVariables.colorScheme.brand.foreground,
  svgSecondaryColor: siteVariables.colorScheme.default.foreground3,
});
