import { CheckboxVariables } from '../../../teams/components/Checkbox/checkboxVariables';

export const checkboxVariables = (siteVars: any): Partial<CheckboxVariables> => {
  return {
    borderColorHover: siteVars.accessibleCyan,
    disabledToggleIndicatorColor: siteVars.accessibleGreen,
  };
};
