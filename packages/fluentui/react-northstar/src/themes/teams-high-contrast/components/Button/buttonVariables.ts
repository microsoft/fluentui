import { ButtonVariables } from '../../../teams/components/Button/buttonVariables';

export const buttonVariables = (siteVars: any): Partial<ButtonVariables> => {
  return {
    backgroundColorActive: siteVars.colors.white,
    backgroundColorFocus: siteVars.accessibleCyan,
    borderColorActive: siteVars.colors.white,
    borderColorHover: 'transparent',
    borderColorFocus: 'transparent',
    backgroundColorDisabled: siteVars.accessibleGreen,
    colorFocus: siteVars.colorScheme.default.foregroundHover,

    primaryBackgroundColorActive: siteVars.colors.white,
    primaryBackgroundColorFocus: siteVars.accessibleCyan,

    boxShadow: 'none',
    primaryBoxShadow: 'none',
  };
};
