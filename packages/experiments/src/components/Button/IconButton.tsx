import * as React from 'react';
import { Button } from './Button';
import { IButtonComponent, IButtonTokenReturnType } from './Button.types';
import { ButtonVariantsType } from './ButtonVariants.types';

const baseTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { palette, semanticColors } = theme;

  return {
    backgroundColor: 'transparent',
    backgroundColorHovered: palette.neutralLighter,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,
    borderColor: 'transparent',
    borderColorHovered: 'transparent',
    borderColorPressed: 'transparent',
    borderStyleFocused: 'solid',
    borderWidthFocused: 1,
    highContrastBorderColor: 'transparent',
    highContrastBorderColorHovered: 'transparent',
    highContrastBorderColorPressed: 'transparent',
    iconColor: palette.themePrimary,
    iconColorHovered: palette.themeDarkAlt,
    iconColorPressed: palette.themeDark,
    iconSize: 16
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

export const IconButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  props.disabled && disabledTokens
];

export const IconButton: ButtonVariantsType = props => {
  const { text, iconProps, ...rest } = props;

  return <Button circular icon={iconProps} tokens={IconButtonTokens} {...rest} />;
};
