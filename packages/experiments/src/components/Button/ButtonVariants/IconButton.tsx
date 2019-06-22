import * as React from 'react';
import { createComponent } from '@uifabric/foundation';
import { FontWeights } from '../../../Styling';
import { useButtonState as state } from '../Button.state';
import { ButtonStyles as styles } from '../Button.styles';
import { IButtonComponent, IButtonProps, IButtonTokenReturnType } from '../Button.types';
import { ButtonView } from '../Button.view';

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
    contentPadding: 0,
    cursor: 'pointer',
    highContrastBorderColor: 'transparent',
    highContrastBorderColorHovered: 'transparent',
    highContrastBorderColorPressed: 'transparent',
    iconColor: palette.themePrimary,
    iconColorHovered: palette.themeDarkAlt,
    iconColorPressed: palette.themeDark,
    iconSize: 16,
    iconWeight: 14,
    lineHeight: 1,
    minHeight: 32,
    minWidth: 32,
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
    iconColor: semanticColors.disabledText,
    iconColorHovered: semanticColors.disabledText,
    iconColorPressed: semanticColors.disabledText
  };
};

const IconButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  props.disabled && disabledTokens
];

// TODO: Make this button circular by default
export const IconButton: React.StatelessComponent<IButtonProps> = createComponent(ButtonView, {
  displayName: 'IconButton',
  state,
  styles,
  tokens: IconButtonTokens
});
