import { pxToRem } from '../../../../utils';

export interface CarouselVariables {
  width: number;
  height: number;
  paddlePreviousSize: number;
  paddleNextSize: number;
  focusOuterBorderColor: string;
  focusOuterBorderRadius: string;

  paddleHeight: string;

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

  paddleIndicatorSize: string;

  focusBorderRadius: string;
  focusBorderWidth: string;
  focusInnerBorderColor: string;
  focusBorderZIndex: string;
}

export const carouselVariables = (siteVars): CarouselVariables => ({
  width: 300,
  height: 300,
  paddlePreviousSize: 32,
  paddleNextSize: 32,
  focusOuterBorderColor: siteVars.focusOuterBorderColor,
  focusOuterBorderRadius: siteVars.borderRadius,

  paddleHeight: pxToRem(32),

  paddleColor: siteVars.colorScheme.default.foreground,
  paddleBackgroundColor: siteVars.colorScheme.default.background,
  paddleBorderRadius: siteVars.borderRadius,
  paddleBorderColor: siteVars.colorScheme.default.border,
  paddleBoxShadow: siteVars.shadowLevel1,

  paddleColorHover: siteVars.colorScheme.brand.foregroundHover,
  paddleBackgroundColorHover: siteVars.colorScheme.default.backgroundHover2,
  paddleBorderColorHover: siteVars.colorScheme.default.borderHover,

  paddleColorActive: siteVars.colorScheme.default.foregroundPressed,
  paddleBackgroundColorActive: siteVars.colorScheme.default.backgroundPressed,
  paddleBorderColorActive: siteVars.colorScheme.default.borderPressed,

  paddleBackgroundColorFocus: undefined,
  paddleBorderColorFocus: undefined,
  paddleColorFocus: undefined,

  paddleColorDisabled: siteVars.colorScheme.brand.foregroundDisabled,
  paddleBackgroundColorDisabled: siteVars.colorScheme.default.backgroundDisabled,
  paddleBorderColorDisabled: 'transparent',

  paddleIndicatorSize: pxToRem(16),

  focusBorderRadius: siteVars.borderRadius,
  focusBorderWidth: siteVars.borderWidth,
  focusInnerBorderColor: siteVars.focusInnerBorderColor,
  focusBorderZIndex: siteVars.zIndexes.foreground,
});
