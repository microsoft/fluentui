import { pxToRem } from '../../../../utils';

export interface BreadcrumbVariables {
  dividerMargin?: string;
  fontSizeSmaller?: string;
  fontSizeSmall?: string;
  fontSizeMedium?: string;
  fontSizeLarge?: string;
  fontSizeLarger?: string;
}

export const breadcrumbVariables = (): BreadcrumbVariables => ({
  dividerMargin: `0 ${pxToRem(8)}`,
  fontSizeSmaller: pxToRem(12),
  fontSizeSmall: pxToRem(12),
  fontSizeMedium: pxToRem(14),
  fontSizeLarge: pxToRem(18),
  fontSizeLarger: pxToRem(18),
});
