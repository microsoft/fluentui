import { pxToRem } from '../../../../utils';

export interface CarouselVariables {
  width: number;
  height: number;

  focusOuterBorderColor: string;
  focusOuterBorderRadius: string;

  paddleColor: string;
  paddleBackgroundColor: string;
  paddleBorderRadius: string;
  paddleBorderColor: string;
  paddleBoxShadow: string;

  paddleColorHover: string;
  paddleBackgroundColorHover: string;
  paddleBorderColorHover: string;

  paddleColorActive: string;
  paddleBackgroundColorActive: string;
  paddleBorderColorActive: string;

  paddleBackgroundColorFocus: string;
  paddleBorderColorFocus: string;
  paddleColorFocus: string;

  paddleColorDisabled: string;
  paddleBackgroundColorDisabled: string;
  paddleBorderColorDisabled: string;

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
  paddleBorderColorActive: undefined,
  paddleBorderColorHover: undefined,
  paddleBorderColorFocus: undefined,
  paddleBorderColorDisabled: undefined,

  paddleBorderRadius: siteVars.borderRadius,
  paddleBoxShadow: undefined,

  paddleHeight: pxToRem(32),

  paddleIndicatorSize: pxToRem(16),

  focusBorderRadius: siteVars.borderRadius,
  focusBorderWidth: siteVars.borderWidth,
  focusInnerBorderColor: siteVars.focusInnerBorderColor,
  focusBorderZIndex: siteVars.zIndexes.foreground,
});
