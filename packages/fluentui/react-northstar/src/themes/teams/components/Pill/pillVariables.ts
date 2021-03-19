import { pxToRem } from '../../../../utils';
import { SiteVariablesPrepared } from '@fluentui/styles';

export interface PillVariables {
  background: string;
  backgroundHover: string;
  borderRadiusCircular: string;
  borderRadiusRounded: string;
  // Smaller ( default )
  height: string;
  minWidth: string;
  horizontalMargin: string;
  verticalMargin: string;

  // Small
  heightSmall: string;
  minWidthSmall: string;
  horizontalMarginSmall: string;
  verticalMarginSmall: string;

  // medium
  heightMedium: string;
  minWidthMedium: string;
  horizontalMarginMedium: string;
  verticalMarginMedium: string;
  borderRadiusRoundedMedium: string;

  // Content
  contentVerticalPadding: string;
  contentHorizontalPadding: string;
  contentFontSize: string;

  // Content Small
  contentVerticalPaddingSmall: string;
  contentHorizontalPaddingSmall: string;
  contentFontSizeSmall: string;

  // Content Medium
  contentVerticalPaddingMedium: string;
  contentHorizontalPaddingMedium: string;
  contentFontSizeMedium: string;
}

export const pillVariables = (siteVars: SiteVariablesPrepared): PillVariables => ({
  background: siteVars.colorScheme.default.background3,
  backgroundHover: siteVars.colorScheme.default.background1,
  borderRadiusCircular: '9999px',
  borderRadiusRounded: pxToRem(2),

  // Smaller ( default )
  height: pxToRem(20),
  minWidth: pxToRem(80),

  horizontalMargin: pxToRem(2),
  verticalMargin: pxToRem(6),

  // Small
  heightSmall: pxToRem(24),
  minWidthSmall: pxToRem(80),

  horizontalMarginSmall: pxToRem(4),
  verticalMarginSmall: pxToRem(4),

  // Medium
  heightMedium: pxToRem(32),
  minWidthMedium: pxToRem(90),
  verticalMarginMedium: pxToRem(6),
  horizontalMarginMedium: pxToRem(4),
  borderRadiusRoundedMedium: pxToRem(4),

  // Content
  contentVerticalPadding: pxToRem(2),
  contentHorizontalPadding: pxToRem(8),
  contentFontSize: pxToRem(12),

  // Content Small
  contentFontSizeSmall: pxToRem(12),
  contentVerticalPaddingSmall: pxToRem(4),
  contentHorizontalPaddingSmall: pxToRem(8),

  // Content Medium
  contentFontSizeMedium: pxToRem(14),
  contentVerticalPaddingMedium: pxToRem(6),
  contentHorizontalPaddingMedium: pxToRem(8),
});
