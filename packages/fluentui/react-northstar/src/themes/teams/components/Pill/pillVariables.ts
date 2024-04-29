import { pxToRem } from '../../../../utils';
import { SiteVariablesPrepared } from '@fluentui/styles';

export interface PillVariables {
  background: string;
  backgroundHover: string;
  borderRadius: string;
  roundedBorderRadius: string;

  // Outline
  outlineBackground: string;
  outlineBorderColor: string;
  outlineDisabledborder: string;

  // Inverted
  invertedBackground: string;

  // Disabled
  disabledBackground: string;
  disabledColor: string;

  // Smaller
  smallerHeight: string;
  smallerMinWidth: string;
  smallerMargin: string;

  // Small
  smallHeight: string;
  smallMinWidth: string;
  smallMargin: string;

  // medium
  height: string;
  minWidth: string;
  margin: string;
  smallerRoundedBorderRadius: string;

  // Content
  contentPadding: string;
  contentFontSize: string;

  // Content Smaller
  contentPaddingSmaller: string;
  contentFontSizeSmaller: string;

  // Content Small
  contentPaddingSmall: string;
  contentFontSizeSmall: string;

  // Action
  actionMargin: string;
  actionWidth: string;
  smallOrSmallerActionWidth: string;

  // Icon
  iconMargin: string;
  iconWidth: string;
  smallOrSmallerIconWidth: string;
  selectedIconColor: string;
  selectedIconCheckColor: string;
  selectedImageIconWidth: string;
  smallSelectedImageIconWidth: string;
  smallerSelectedImageIconWidth: string;

  // Image
  imageWidth: string;
  imageHeight: string;
  smallImageWidth: string;
  smallImageHeight: string;
  smallerImageWidth: string;
  smallerImageHeight: string;
}

export const pillVariables = (siteVars: SiteVariablesPrepared): PillVariables => ({
  background: siteVars.colorScheme.default.background3,
  backgroundHover: siteVars.colorScheme.default.background1,
  borderRadius: '9999px',
  smallerRoundedBorderRadius: pxToRem(2),

  // Disabled
  disabledBackground: siteVars.colorScheme.default.backgroundDisabled,
  disabledColor: siteVars.colorScheme.default.foregroundDisabled,

  // Inverted
  invertedBackground: siteVars.colorScheme.default.background,

  // Outline
  outlineBackground: 'transparent',
  // TODO: The design spec maps to Neutral Stroke 1 that is equivalent to gre[440]
  // but we don't have this token
  outlineBorderColor: siteVars.colorScheme.default.borderActive4,
  outlineDisabledborder: siteVars.colorScheme.default.borderDisabled,

  // Smaller
  smallerHeight: pxToRem(20),
  smallerMinWidth: pxToRem(80),
  smallerMargin: `${pxToRem(6)} ${pxToRem(2)}`,

  // Small
  smallHeight: pxToRem(24),
  smallMinWidth: pxToRem(80),
  smallMargin: pxToRem(4),

  // Medium (default)
  height: pxToRem(32),
  minWidth: pxToRem(90),
  margin: `${pxToRem(6)} ${pxToRem(4)}`,
  roundedBorderRadius: siteVars.borderRadiusMedium,

  // Content Smaller
  contentPaddingSmaller: `${pxToRem(2)} ${pxToRem(8)}`,
  contentFontSizeSmaller: pxToRem(12),

  // Content Small
  contentFontSizeSmall: pxToRem(12),
  contentPaddingSmall: `${pxToRem(4)} ${pxToRem(8)}`,

  // Content Medium
  contentFontSize: pxToRem(14),
  contentPadding: `${pxToRem(6)} ${pxToRem(8)}`,

  // Action Pill
  actionMargin: `0 ${pxToRem(8)}`,
  actionWidth: pxToRem(16),
  smallOrSmallerActionWidth: pxToRem(12),

  // Icon Pill
  iconMargin: `0 0 0 ${pxToRem(8)}`,
  iconWidth: pxToRem(20),
  smallOrSmallerIconWidth: pxToRem(16),
  selectedIconColor: siteVars.colorScheme.default.border,
  selectedIconCheckColor: siteVars.colorScheme.brand.background2,
  selectedImageIconWidth: pxToRem(32),
  smallSelectedImageIconWidth: pxToRem(24),
  smallerSelectedImageIconWidth: pxToRem(20),

  // Image Pill
  imageWidth: pxToRem(32),
  imageHeight: pxToRem(32),
  smallImageWidth: pxToRem(24),
  smallImageHeight: pxToRem(24),
  smallerImageWidth: pxToRem(20),
  smallerImageHeight: pxToRem(20),
});
