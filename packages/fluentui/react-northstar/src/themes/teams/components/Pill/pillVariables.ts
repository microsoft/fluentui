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
  roundedBorderRadius: pxToRem(4),

  // Content Smaller
  contentPaddingSmaller: `${pxToRem(2)} ${pxToRem(8)}`,
  contentFontSizeSmaller: pxToRem(12),

  // Content Small
  contentFontSizeSmall: pxToRem(12),
  contentPaddingSmall: `${pxToRem(4)} ${pxToRem(8)}`,

  // Content Medium
  contentFontSize: pxToRem(14),
  contentPadding: `${pxToRem(6)} ${pxToRem(8)}`,
});
