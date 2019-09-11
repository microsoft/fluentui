import * as React from 'react';
// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { FontWeights } from '../../../Styling';
import { useButtonState as state } from '../Button.state';
import { ButtonStyles as styles } from '../Button.styles';
import { IButtonComponent, IButtonProps, IButtonTokenReturnType } from '../Button.types';
import { ButtonSlots as slots, ButtonView as view } from '../Button.view';

const baseTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { palette, semanticColors } = theme;

  return {
    backgroundColor: 'transparent',
    backgroundColorHovered: palette.neutralLighter,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,
    borderColor: 'transparent',
    borderColorHovered: 'transparent',
    borderColorPressed: 'transparent',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    contentPadding: 0,
    cursor: 'pointer',
    highContrastBackgroundColor: 'WindowText',
    highContrastBackgroundColorHovered: 'Highlight',
    highContrastBackgroundColorPressed: 'Highlight',
    highContrastBorderColor: 'transparent',
    highContrastBorderColorHovered: 'transparent',
    highContrastBorderColorPressed: 'transparent',
    highContrastIconColor: 'Window',
    highContrastIconColorHovered: 'Window',
    highContrastIconColorPressed: 'Window',
    iconColor: palette.themePrimary,
    iconColorHovered: palette.themeDarkAlt,
    iconColorPressed: palette.themeDark,
    iconSize: 16,
    lineHeight: 1,
    minHeight: 32,
    minWidth: 32,
    msHighContrastAdjust: 'none',
    outlineColor: 'transparent',
    textFamily: 'inherit',
    textSize: 14,
    textWeight: FontWeights.semibold
  };
};

const disabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;

  return {
    backgroundColor: semanticColors.inputBackground,
    backgroundColorHovered: semanticColors.inputBackground,
    backgroundColorPressed: semanticColors.inputBackground,
    cursor: 'default',
    highContrastBackgroundColor: 'Window',
    highContrastBackgroundColorHovered: 'Window',
    highContrastBackgroundColorPressed: 'Window',
    highContrastIconColor: 'GrayText',
    highContrastIconColorHovered: 'GrayText',
    highContrastIconColorPressed: 'GrayText',
    iconColor: semanticColors.disabledText,
    iconColorHovered: semanticColors.disabledText,
    iconColorPressed: semanticColors.disabledText
  };
};

const IconButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  props.disabled && disabledTokens
];

export const IconButton: React.StatelessComponent<IButtonProps> = composed({
  displayName: 'IconButton',
  slots,
  state,
  styles,
  tokens: IconButtonTokens,
  view
});
