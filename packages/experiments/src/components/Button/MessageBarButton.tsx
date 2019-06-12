import * as React from 'react';
import { Button } from './Button';
import { IButtonComponent, IButtonTokenReturnType } from './Button.types';
import { ButtonVariantsType } from './ButtonVariants.types';

const baseTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { palette } = theme;

  return {
    borderColor: palette.neutralTertiaryAlt,
    borderColorHovered: palette.neutralTertiaryAlt,
    borderColorPressed: palette.neutralTertiaryAlt,
    contentPadding: 0,
    height: 24,
    minHeight: 24,
    minWidth: 84,
    width: 84
  };
};

const disabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;

  return {
    borderColor: semanticColors.buttonBorderDisabled,
    borderColorHovered: semanticColors.buttonBorderDisabled,
    borderColorPressed: semanticColors.buttonBorderDisabled
  };
};

export const MessageBarButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  props.disabled && disabledTokens
];

export const MessageBarButton: ButtonVariantsType = props => {
  const { text, iconProps, ...rest } = props;

  return <Button content={text} icon={iconProps} tokens={MessageBarButtonTokens} {...rest} />;
};
