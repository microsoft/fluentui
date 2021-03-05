import { pxToRem } from '../../../../utils';

export interface ProviderVariables {
  background: string;
  color: string;

  scrollbarHeight: string;
  scrollbarWidth: string;

  scrollbarThumbBackgroundColor: string;
  scrollbarThumbBorderRadius: string;
  scrollbarThumbBorderSize: string;

  scrollbarThumbHoverBackgroundColor: string;
  scrollbarThumbHoverBorderSize: string;
}

export const providerVariables = (siteVariables): Partial<ProviderVariables> => ({
  background: siteVariables.bodyBackground,
  color: siteVariables.bodyColor,

  scrollbarHeight: pxToRem(16),
  scrollbarWidth: pxToRem(16),

  scrollbarThumbBackgroundColor: siteVariables.colors.onyx[700],
  scrollbarThumbBorderRadius: pxToRem(9),
  scrollbarThumbBorderSize: pxToRem(4),

  scrollbarThumbHoverBackgroundColor: siteVariables.colors.onyx[700],
  scrollbarThumbHoverBorderSize: pxToRem(2),
});
