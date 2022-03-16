import { pxToRem } from '../../../../utils';

export interface CarouselVariables {
  width: number;
  height: number;

  focusOuterBorderColor: string;
  focusOuterBorderRadius: string;

  paddleColor: string;
  paddleColorDisabled: string;

  paddleBackgroundColor: string;
  paddleBackgroundColorActive: string;
  paddleBackgroundColorHover: string;
  paddleBackgroundColorDisabled: string;

  paddleBorderColor: string;

  paddleBorderRadius: string;

  paddleHeight: string;

  paddleIndicatorSize: string;

  focusBorderRadius: string;
  focusBorderWidth: string;
  focusInnerBorderColor: string;
  focusBorderZIndex: string;
}

export const carouselVariables = (siteVars): CarouselVariables => ({
  width: 300,
  height: 300,

  focusOuterBorderColor: siteVars.focusOuterBorderColor,
  focusOuterBorderRadius: siteVars.borderRadiusMedium,

  paddleColor: siteVars.colorScheme.default.foreground4,
  paddleColorDisabled: siteVars.colorScheme.brand.foregroundDisabled,

  paddleBackgroundColor: siteVars.colorScheme.onyx.background3,
  paddleBackgroundColorActive: siteVars.colorScheme.onyx.backgroundPressed,
  paddleBackgroundColorHover: siteVars.colorScheme.onyx.backgroundHover,
  paddleBackgroundColorDisabled: siteVars.colorScheme.default.backgroundDisabled,

  paddleBorderColor: 'transparent',

  paddleBorderRadius: siteVars.borderRadiusMedium,

  paddleHeight: pxToRem(32),

  paddleIndicatorSize: pxToRem(16),

  focusBorderRadius: siteVars.borderRadiusMedium,
  focusBorderWidth: siteVars.borderWidth,
  focusInnerBorderColor: siteVars.focusInnerBorderColor,
  focusBorderZIndex: siteVars.zIndexes.foreground,
});
