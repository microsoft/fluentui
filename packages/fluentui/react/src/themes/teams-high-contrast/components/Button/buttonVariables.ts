import { ButtonVariables } from '../../../teams/components/Button/buttonVariables';

export interface ButtonHighContrastVariables {
  backgroundColorFocus: string;
  primaryBackgroundColorFocus: string;
}

export default (siteVars: any): Partial<ButtonVariables> & ButtonHighContrastVariables => {
  return {
    backgroundColorActive: siteVars.colors.white,
    backgroundColorFocus: siteVars.accessibleCyan,
    borderColorActive: siteVars.colors.white,
    backgroundColorDisabled: siteVars.accessibleGreen,

    primaryBackgroundColorActive: siteVars.colors.white,
    primaryBackgroundColorFocus: siteVars.accessibleCyan,

    boxShadow: 'none',
    primaryBoxShadow: 'none'
  };
};
