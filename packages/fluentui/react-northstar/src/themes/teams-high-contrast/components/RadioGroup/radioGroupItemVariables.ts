import { RadioGroupItemVariables } from '../../../teams/components/RadioGroup/radioGroupItemVariables';

export const radioGroupItemVariables = (siteVars: any): Partial<RadioGroupItemVariables> => ({
  colorDisabled: siteVars.accessibleGreen,

  textColorDefault: siteVars.colors.white,
  textColorDefaultHoverFocus: siteVars.colors.white,
  textColorChecked: siteVars.colors.white,

  indicatorColorDefault: siteVars.colors.white,
  indicatorBorderColorDefaultHover: siteVars.accessibleCyan,
  indicatorBorderColorChecked: siteVars.accessibleCyan,

  indicatorBackgroundColorChecked: siteVars.accessibleCyan,
});
