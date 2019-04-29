import * as React from 'react';
import { Button } from './Button';
import { IButtonComponent, IButtonTokenReturnType } from './Button.types';
import { ButtonVariantsType } from './ButtonVariants.types';

const baseTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { palette } = theme;

  return {
    backgroundColor: palette.neutralLighter,
    backgroundColorHovered: palette.neutralLight,
    backgroundColorPressed: palette.neutralQuaternaryAlt,
    highContrastBorderColor: 'transparent',
    highContrastBorderColorHovered: 'transparent',
    highContrastBorderColorPressed: 'transparent',
    color: palette.neutralPrimary,
    colorHovered: palette.neutralDark,
    colorPressed: theme.palette.black,
    iconColor: theme.palette.themeDarkAlt,
    iconColorHovered: theme.palette.themeDarkAlt,
    iconColorPressed: theme.palette.themeDarkAlt,
    minHeight: 0,
    minWidth: 40,
    textWeight: 'normal'
  };
};

const disabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;

  return {
    backgroundColor: semanticColors.buttonBackgroundDisabled,
    backgroundColorHovered: semanticColors.buttonBackgroundDisabled,
    backgroundColorPressed: semanticColors.buttonBackgroundDisabled,
    color: semanticColors.buttonTextDisabled,
    colorHovered: semanticColors.buttonTextDisabled,
    colorPressed: semanticColors.buttonTextDisabled,
    iconColor: semanticColors.buttonTextDisabled,
    iconColorHovered: semanticColors.buttonTextDisabled,
    iconColorPressed: semanticColors.buttonTextDisabled
  };
};

export const CommandBarButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  props.disabled && disabledTokens
];

export const CommandBarButton: ButtonVariantsType = props => {
  const { text, iconProps, ...rest } = props;

  return <Button content={text} icon={iconProps} tokens={CommandBarButtonTokens} {...rest} />;
};
