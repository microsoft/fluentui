import { RadioGroupItemVariables } from '../../../teams/components/RadioGroup/radioGroupItemVariables';

export const radioGroupItemVariables = (siteVars: any): Partial<RadioGroupItemVariables> => ({
  colorDisabled: siteVars.colors.grey[450],

  textColorDefault: siteVars.colors.grey[250],
  textColorDefaultHoverFocus: siteVars.colors.white,
  textColorChecked: siteVars.colors.white,

  indicatorColorDefault: siteVars.colors.grey[250],
  indicatorBorderColorDefaultHover: siteVars.colors.white,
  indicatorBorderColorChecked: siteVars.colors.brand[400],

  indicatorBackgroundColorChecked: siteVars.colors.brand[400],
});
