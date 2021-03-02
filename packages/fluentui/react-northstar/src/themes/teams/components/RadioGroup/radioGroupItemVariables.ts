import { pxToRem } from '../../../../utils';

export type RadioGroupItemVariables = {
  colorDisabled: string;

  textFontSize: string;

  textColorDefault: string;
  textColorDefaultHoverFocus: string;
  textColorChecked: string;

  indicatorColorDefault: string;
  indicatorBorderColorDefaultHover: string;
  indicatorBorderColorChecked: string;

  indicatorBackgroundColorChecked: string;

  padding: string;
  margin: string;
};

export const radioGroupItemVariables = (siteVars: any): RadioGroupItemVariables => ({
  colorDisabled: siteVars.colors.grey[250],

  textFontSize: siteVars.fontSizes.medium,

  textColorDefault: siteVars.colors.grey[500],
  textColorDefaultHoverFocus: siteVars.colors.grey[750],
  textColorChecked: siteVars.colors.grey[750],

  indicatorColorDefault: siteVars.colors.grey[500],
  indicatorBorderColorDefaultHover: siteVars.colors.grey[750],
  indicatorBorderColorChecked: siteVars.colors.brand[600],

  indicatorBackgroundColorChecked: siteVars.colors.brand[600],

  padding: `0 ${pxToRem(2)}`,
  margin: `${pxToRem(5)} ${pxToRem(8)} ${pxToRem(5)} ${pxToRem(2)}`,
});
