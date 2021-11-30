import { ButtonVariables } from '../../../teams/components/Button/buttonVariables';
import { systemColors } from '../../systemColors';

export const buttonVariables = (siteVars: any): Partial<ButtonVariables> => ({
  colorHover: systemColors.highlightText,
  colorActive: systemColors.canvas,
  colorDisabled: systemColors.grayText,
  colorFocus: systemColors.highlightText,
  backgroundColorActive: systemColors.canvasText,
  backgroundColorHover: systemColors.highlight,
  backgroundColorFocus: systemColors.highlight,
  backgroundColorDisabled: systemColors.buttonFace,
  borderColorHover: systemColors.highlight,
  borderColorFocus: systemColors.highlight,
  borderColorActive: systemColors.canvasText,
  borderColorDisabled: systemColors.grayText,
  backgroundColorIconOnlyHover: systemColors.highlight,

  primaryColor: systemColors.buttonFace,
  primaryColorHover: systemColors.highlightText,
  primaryBackgroundColor: systemColors.buttonText,
  primaryBackgroundColorActive: systemColors.canvasText,
  primaryBackgroundColorHover: systemColors.highlight,
  primaryBackgroundColorDisabled: systemColors.grayText,
  primaryBackgroundColorFocus: systemColors.highlightText,
  primaryBorderColor: systemColors.buttonText,

  tintedColorHover: systemColors.highlightText,
  tintedBackgroundColorActive: systemColors.highlight,
  tintedBackgroundColorHover: systemColors.highlight,
  tintedBorderColorHover: systemColors.highlight,

  textColorHover: systemColors.highlight,
  textPrimaryColor: systemColors.buttonText,
  textPrimaryColorHover: systemColors.highlight,
  textColorDisabled: systemColors.grayText,
  textColorIconOnlyHover: systemColors.highlightText,
  textColorActive: systemColors.canvasText,

  invertedColorActive: systemColors.highlightText,
  invertedBackgroundColorActive: systemColors.highlight,
  invertedBackgroundColorFocus: systemColors.highlight,
  invertedColorFocus: systemColors.highlightText,
  invertedBackgroundColorHover: systemColors.highlight,
  invertedColorHover: systemColors.highlightText,
});
