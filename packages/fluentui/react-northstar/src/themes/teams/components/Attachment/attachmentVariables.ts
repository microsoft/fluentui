import { pxToRem } from '../../../../utils';

export type AttachmentVariables = {
  padding: string;
  iconSpace: string;
  iconSize: string;

  borderColor: string;
  borderRadius: string;
  backgroundColor: string;
  backgroundColorHover: string;
  textColor: string;
  textColorHover: string;
  boxShadow: string;

  focusBackgroundColor: string;
  focusColor: string;

  progressColor: string;
  progressHeight: string;

  headerFontSize: string;
  headerFontWeight: number;
  headerLineHeight: number;

  descriptionFontSize: string;
  descriptionFontWeight: number;
  descriptionLineHeight: number;

  actionHeight: string;
  actionMaxWidth: string;
  actionColor: string;
  actionPrimaryColor: string;
  actionColorDisabled: string;
  actionIconSize: string;
  actionLoaderBorderSize: string;
  actionLoaderSize: string;
  actionLoaderSvgHeight: string;
  actionLoaderSvgAnimationHeight: string;
  actionFocusBorderRadius: string;
};

export const attachmentVariables = (siteVariables: any): AttachmentVariables => ({
  padding: `${pxToRem(7)} ${pxToRem(3)} ${pxToRem(7)} ${pxToRem(11)}`, // padding set to 1px less to account for 1px border
  iconSpace: pxToRem(12),
  iconSize: pxToRem(32),
  borderColor: siteVariables.colorScheme.default.border3,
  borderRadius: siteVariables.borderRadiusMedium,
  backgroundColor: siteVariables.colorScheme.default.background4,
  backgroundColorHover: siteVariables.colorScheme.default.backgroundHover1,
  textColor: siteVariables.colorScheme.default.foreground,
  textColorHover: siteVariables.colorScheme.default.foregroundHover,
  boxShadow: siteVariables.shadowLevel1,

  focusBackgroundColor: undefined,
  focusColor: undefined,

  progressColor: siteVariables.colorScheme.green.background,
  progressHeight: pxToRem(4),

  headerFontSize: siteVariables.fontSizes.medium,
  headerFontWeight: siteVariables.fontWeightSemibold,
  headerLineHeight: siteVariables.lineHeightMedium,

  descriptionFontSize: siteVariables.fontSizes.small,
  descriptionFontWeight: siteVariables.fontWeightRegular,
  descriptionLineHeight: siteVariables.lineHeightDefault,

  // action variables
  actionHeight: pxToRem(32),
  actionMaxWidth: pxToRem(280),
  actionColor: siteVariables.colorScheme.default.foreground,
  actionPrimaryColor: siteVariables.colorScheme.brand.foreground,
  actionColorDisabled: siteVariables.colorScheme.brand.foregroundDisabled1,
  actionIconSize: pxToRem(16),
  actionLoaderBorderSize: pxToRem(2),
  actionLoaderSize: pxToRem(20),
  actionLoaderSvgHeight: pxToRem(20),
  actionLoaderSvgAnimationHeight: pxToRem(-1200),
  actionFocusBorderRadius: siteVariables.borderRadiusMedium,
});
