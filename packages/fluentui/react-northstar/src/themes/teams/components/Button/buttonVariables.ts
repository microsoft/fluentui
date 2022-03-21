import { Property } from 'csstype';

import { pxToRem } from '../../../../utils';

export interface ButtonVariables {
  padding: string;
  height: string;
  minWidth: string;
  loadingMinWidth: string;
  maxWidth: string;
  borderRadius: string;
  contentFontWeight: Property.FontWeight;
  contentFontSize: string;
  contentLineHeight: string;

  color: string;
  colorHover: string;
  colorActive: string;
  colorDisabled: string;
  colorFocus: string;
  backgroundColor: string;
  backgroundColorActive: string;
  backgroundColorHover: string;
  backgroundColorIconOnlyHover: string;

  backgroundColorDisabled: string;
  borderColor: string;
  borderColorHover: string;
  borderColorActive: string;
  borderColorDisabled: string;
  borderColorFocus: string;
  backgroundColorFocus: string;

  iconSize: string;

  primaryColor: string;
  primaryColorHover: string;
  primaryBackgroundColor: string;
  primaryBackgroundColorActive: string;
  primaryBackgroundColorHover: string;
  primaryBackgroundColorFocus: string;
  primaryBackgroundColorDisabled: string;
  primaryBorderColor: string;

  tintedColor: string;
  tintedColorHover: string;
  tintedBackgroundColor: string;
  tintedBackgroundColorActive: string;
  tintedBackgroundColorHover: string;
  tintedBorderColor: string;
  tintedBorderColorHover: string;

  circularBorderRadius: string;

  textColor: string;
  textColorHover: string;
  textPrimaryColor: string;
  textPrimaryColorHover: string;
  textColorDisabled: string;
  textColorIconOnlyHover: string;

  primaryBoxShadow: string;
  boxShadow: string;

  loaderBorderSize: string;
  loaderSize: string;
  loaderSvgHeight: string;
  loaderSvgAnimationHeight: string;

  sizeSmallContentFontSize: string;
  sizeSmallContentLineHeight: string;
  sizeSmallHeight: string;
  sizeSmallMinWidth: string;
  sizeSmallPadding: string;
  sizeSmallLoaderBorderSize: string;
  sizeSmallLoaderSize: string;
  sizeSmallLoaderSvgHeight: string;
  sizeSmallLoaderSvgAnimationHeight: string;
}

export const buttonVariables = (siteVars: any): ButtonVariables => ({
  padding: `0 ${pxToRem(20)}`,
  height: pxToRem(32),
  minWidth: pxToRem(96),
  loadingMinWidth: pxToRem(118),
  maxWidth: pxToRem(280),
  borderRadius: siteVars.borderRadiusMedium,

  contentFontSize: siteVars.fontSizes.medium,
  contentFontWeight: siteVars.fontWeightSemibold,
  contentLineHeight: siteVars.lineHeightMedium,

  color: siteVars.colorScheme.default.foreground,
  colorHover: siteVars.colorScheme.default.foregroundHover,
  colorActive: siteVars.colorScheme.default.foregroundPressed,
  colorDisabled: siteVars.colorScheme.brand.foregroundDisabled,
  colorFocus: undefined,
  iconSize: pxToRem(16),
  backgroundColor: siteVars.colorScheme.default.background,
  backgroundColorActive: siteVars.colorScheme.default.backgroundPressed,
  backgroundColorHover: siteVars.colorScheme.default.backgroundHover1,
  backgroundColorFocus: undefined,
  backgroundColorDisabled: siteVars.colorScheme.default.backgroundDisabled,
  borderColor: siteVars.colorScheme.default.border,
  borderColorHover: siteVars.colorScheme.default.borderHover,
  borderColorFocus: undefined,
  borderColorActive: siteVars.colorScheme.default.borderPressed,
  borderColorDisabled: 'transparent',
  backgroundColorIconOnlyHover: siteVars.colorScheme.default.backgroundHover2,

  primaryColor: siteVars.colorScheme.brand.foreground4,
  primaryColorHover: siteVars.colorScheme.brand.foreground4,
  primaryBackgroundColor: siteVars.colorScheme.brand.background,
  primaryBackgroundColorActive: siteVars.colorScheme.brand.backgroundPressed,
  primaryBackgroundColorHover: siteVars.colorScheme.brand.backgroundHover,
  primaryBackgroundColorDisabled: siteVars.colorScheme.default.backgroundDisabled,
  primaryBackgroundColorFocus: undefined,
  primaryBorderColor: 'transparent',

  tintedColor: siteVars.colorScheme.brand.foreground,
  tintedColorHover: siteVars.colorScheme.brand.foregroundHover,
  tintedBackgroundColor: siteVars.colorScheme.default.background,
  tintedBackgroundColorActive: siteVars.colorScheme.brand.backgroundHover1,
  tintedBackgroundColorHover: siteVars.colorScheme.brand.backgroundHover1,
  tintedBorderColor: siteVars.colorScheme.brand.border1,
  tintedBorderColorHover: siteVars.colorScheme.brand.borderHover,

  circularBorderRadius: pxToRem(999),

  textColor: siteVars.colorScheme.default.foreground1,
  textColorHover: siteVars.colorScheme.brand.foreground1,
  textPrimaryColor: siteVars.colorScheme.brand.foreground,
  textPrimaryColorHover: siteVars.colorScheme.brand.foreground1,
  textColorDisabled: siteVars.colorScheme.brand.foregroundDisabled1,
  textColorIconOnlyHover: siteVars.colorScheme.brand.foregroundHover,

  primaryBoxShadow: siteVars.shadowLevel1Dark,
  boxShadow: siteVars.shadowLevel1,

  loaderBorderSize: pxToRem(2),
  loaderSize: pxToRem(20),
  loaderSvgHeight: pxToRem(1220),
  loaderSvgAnimationHeight: pxToRem(-1200),

  sizeSmallContentFontSize: siteVars.fontSizes.small,
  sizeSmallContentLineHeight: siteVars.lineHeightSmall,
  sizeSmallHeight: pxToRem(24),
  sizeSmallMinWidth: pxToRem(72),
  sizeSmallPadding: `0 ${pxToRem(8)}`,
  sizeSmallLoaderBorderSize: pxToRem(2),
  sizeSmallLoaderSize: pxToRem(15),
  sizeSmallLoaderSvgHeight: pxToRem(895),
  sizeSmallLoaderSvgAnimationHeight: pxToRem(-880),
});
