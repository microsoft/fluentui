import { ButtonVariables } from '../../../teams/components/Button/buttonVariables';

export const buttonVariables = (siteVars: any): Partial<ButtonVariables> => {
  return {
    backgroundColorActive: 'CanvasText',
    backgroundColorHover: 'Highlight',
    colorHover: 'HighlightText',
    backgroundColorFocus: 'Highlight',
    borderColorActive: siteVars.colors.white,
    borderColorHover: 'transparent',
    borderColorFocus: 'transparent',
    backgroundColorDisabled: 'GrayText',
    colorFocus: 'HighlightText',

    primaryBackgroundColor: 'CanvasText',
    primaryColor: 'Canvas',
    primaryBackgroundColorActive: 'CanvasText',
    primaryBackgroundColorFocus: 'CanvasText',
    primaryBackgroundColorHover: 'Highlight',
    textPrimaryColorHover: 'HighlightText',

    boxShadow: 'none',
    primaryBoxShadow: 'none',
  };
};
