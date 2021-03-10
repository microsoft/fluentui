import { pxToRem } from '../../../../utils';

export interface CarouselVariables {
  width: number;
  height: number;

  focusOuterBorderColor: string;
  focusOuterBorderRadius: string;

  paddleColor: string;
  paddleColorActive: string;
  paddleColorHover: string;
  paddleColorFocus: string;
  paddleColorDisabled: string;

  paddleBackgroundColor: string;
  paddleBackgroundColorActive: string;
  paddleBackgroundColorHover: string;
  paddleBackgroundColorFocus: string;
  paddleBackgroundColorDisabled: string;

  paddleBorderColor: string;

  paddleBorderRadius: string;
  paddleBoxShadow: string;

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
  focusOuterBorderRadius: siteVars.borderRadius,

  paddleColor: siteVars.colorScheme.default.foreground4,
  paddleColorActive: undefined,
  paddleColorHover: undefined,
  paddleColorFocus: undefined,
  paddleColorDisabled: siteVars.colorScheme.brand.foregroundDisabled,

  paddleBackgroundColor: siteVars.colorScheme.onyx.background3,
  paddleBackgroundColorActive: siteVars.colorScheme.onyx.backgroundPressed,
  paddleBackgroundColorHover: siteVars.colorScheme.onyx.backgroundHover,
  paddleBackgroundColorFocus: undefined,
  paddleBackgroundColorDisabled: siteVars.colorScheme.default.backgroundDisabled,

  paddleBorderColor: 'transparent',

  paddleBorderRadius: siteVars.borderRadius,
  paddleBoxShadow: undefined,

  paddleHeight: pxToRem(32),

  paddleIndicatorSize: pxToRem(16),

  focusBorderRadius: siteVars.borderRadius,
  focusBorderWidth: siteVars.borderWidth,
  focusInnerBorderColor: siteVars.focusInnerBorderColor,
  focusBorderZIndex: siteVars.zIndexes.foreground,
});
