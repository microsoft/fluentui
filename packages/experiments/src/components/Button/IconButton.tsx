import * as React from 'react';
import { Button } from './Button';
import { IButtonComponent, IButtonTokenReturnType } from './Button.types';
import { ButtonVariantsType } from './ButtonVariants.types';

const baseTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { palette, semanticColors } = theme;

  return {
    backgroundColor: 'transparent',
    backgroundColorHovered: 'transparent',
    backgroundColorPressed: 'transparent',
    borderColor: 'transparent',
    color: semanticColors.actionLink,
    colorHovered: semanticColors.actionLinkHovered,
    colorPressed: palette.themePrimary,
    highContrastBorderColor: 'transparent',
    highContrastBorderColorHovered: 'transparent',
    highContrastBorderColorPressed: 'transparent',
    iconColor: semanticColors.actionLink,
    iconColorHovered: semanticColors.actionLinkHovered,
    iconColorPressed: palette.themePrimary,
    iconSize: 16
  };
};

const disabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;

  return {
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
