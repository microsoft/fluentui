import * as React from 'react';
import { Button } from './Button';
import { IButtonComponent, IButtonTokenReturnType } from './Button.types';
import { ButtonVariantsType } from './ButtonVariants.types';

const baseTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { palette, semanticColors } = theme;

  return {
    backgroundColor: palette.white,
    backgroundColorHovered: palette.neutralLighter,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,
    borderRadius: 0,
    borderWidth: 0,
    contentPadding: '0px 8px',
    color: semanticColors.buttonText,
    colorHovered: semanticColors.buttonTextHovered,
    colorPressed: semanticColors.buttonTextPressed,
    highContrastBorderColor: 'transparent',
    highContrastBorderColorHovered: 'transparent',
    highContrastBorderColorPressed: 'transparent',
    iconColor: semanticColors.buttonText,
    iconColorHovered: palette.themeDarkAlt,
    iconColorPressed: palette.themeDark,
    minHeight: 0,
    minWidth: 40,
    textWeight: 'normal'
  };
};

const disabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { palette, semanticColors } = theme;

  return {
    backgroundColor: palette.white,
    backgroundColorHovered: palette.white,
    backgroundColorPressed: palette.white,
    color: semanticColors.buttonTextDisabled,
    colorHovered: semanticColors.buttonTextDisabled,
    colorPressed: semanticColors.buttonTextDisabled,
    iconColor: semanticColors.disabledBodySubtext,
    iconColorHovered: semanticColors.disabledBodySubtext,
    iconColorPressed: semanticColors.disabledBodySubtext
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
