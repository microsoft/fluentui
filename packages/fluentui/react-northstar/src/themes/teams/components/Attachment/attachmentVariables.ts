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
  siblingsFocusColor: string;

  siblingsHoverColor: string;

  progressColor: string;
  progressHeight: number;

  headerFontSize: string;
  headerFontWeight: number;
  headerLineHeight: number;

  descriptionFontSize: string;
  descriptionFontWeight: number;
  descriptionLineHeight: number;
};

export default (siteVariables: any): AttachmentVariables => ({
  padding: `${pxToRem(7)} ${pxToRem(3)} ${pxToRem(7)} ${pxToRem(11)}`, // padding set to 1px less to account for 1px border
  iconSpace: pxToRem(12),
  iconSize: pxToRem(32),
  borderColor: siteVariables.colors.grey[200],
  borderRadius: pxToRem(3),
  backgroundColor: siteVariables.colors.grey[100],
  backgroundColorHover: siteVariables.colors.grey[150],
  textColor: siteVariables.colors.grey[750],
  textColorHover: siteVariables.colors.grey[750],
  boxShadow: siteVariables.shadowLevel1,

  focusBackgroundColor: undefined,
  focusColor: undefined,
  siblingsFocusColor: undefined,

  siblingsHoverColor: undefined,

  progressColor: siteVariables.colors.green[200],
  progressHeight: 4,

  headerFontSize: siteVariables.fontSizes.medium,
  headerFontWeight: siteVariables.fontWeightSemibold,
  headerLineHeight: siteVariables.lineHeightMedium,

  descriptionFontSize: siteVariables.fontSizes.small,
  descriptionFontWeight: siteVariables.fontWeightRegular,
  descriptionLineHeight: siteVariables.lineHeightDefault,
});
