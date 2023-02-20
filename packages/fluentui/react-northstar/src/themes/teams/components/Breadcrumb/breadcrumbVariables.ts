import { pxToRem } from '../../../../utils';
import { Property } from 'csstype';

export interface BreadcrumbVariables {
  dividerMargin?: string;
  fontSizeSmaller?: string;
  fontSizeSmall?: string;
  fontSizeMedium?: string;
  fontSizeLarge?: string;

  // Breadcrumb Item
  itemCurrentFontWeight?: Property.FontWeight;

  // Breadcrumb Link
  linkPaddingTop: string;
  linkPaddingBottom: string;
  linkPaddingLeftSmaller?: string;
  linkPaddingRightSmaller?: string;
  linkPaddingLeftSmall?: string;
  linkPaddingRightSmall?: string;
  linkPaddingLeftMedium?: string;
  linkPaddingRightMedium?: string;
  linkPaddingLeftLarge?: string;
  linkPaddingRightLarge?: string;
  linkSmallerGap?: string;
  linkSmallGap?: string;
  linkMediumGap?: string;
  linkLargeGap?: string;
  disabledColor?: string;
}

export const breadcrumbVariables = (siteVars): BreadcrumbVariables => ({
  dividerMargin: `0 ${pxToRem(8)}`,
  fontSizeSmaller: pxToRem(12),
  fontSizeSmall: pxToRem(12),
  fontSizeMedium: pxToRem(14),
  fontSizeLarge: pxToRem(18),

  // Breadcrumb Item
  itemCurrentFontWeight: siteVars.fontWeightBold,

  // Breadcrumb Link
  linkPaddingTop: pxToRem(6),
  linkPaddingBottom: pxToRem(6),
  linkPaddingLeftSmaller: pxToRem(4),
  linkPaddingRightSmaller: pxToRem(4),
  linkPaddingLeftSmall: pxToRem(8),
  linkPaddingRightSmall: pxToRem(8),
  linkPaddingLeftMedium: pxToRem(12),
  linkPaddingRightMedium: pxToRem(12),
  linkPaddingLeftLarge: pxToRem(12),
  linkPaddingRightLarge: pxToRem(12),
  linkSmallerGap: pxToRem(2),
  linkSmallGap: pxToRem(8),
  linkMediumGap: pxToRem(8),
  linkLargeGap: pxToRem(8),
  disabledColor: siteVars.colorScheme.default.foregroundDisabled,
});
