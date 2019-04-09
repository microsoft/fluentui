import * as React from 'react';
import { Button } from './Button';
import { IButtonComponent, IButtonTokenReturnType } from './Button.types';
import { ButtonVariantsType } from './ButtonVariants.types';
import { FontWeights } from '../../Styling';

const baseTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { palette } = theme;

  return {
    backgroundColor: 'transparent',
    backgroundColorHovered: 'transparent',
    backgroundColorPressed: 'transparent',
    borderColor: 'transparent',
    color: palette.neutralPrimary,
    colorHovered: palette.themePrimary,
    colorPressed: palette.black,
    contentPadding: '0px 8px',
    height: '40px',
    iconColor: palette.neutralPrimary,
    iconColorHovered: palette.themePrimary,
    iconColorPressed: palette.black,
    textWeight: FontWeights.regular
  };
};

const disabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { palette } = theme;

  return {
    color: palette.neutralTertiary,
    colorHovered: palette.neutralTertiary,
    colorPressed: palette.neutralTertiary,
    iconColor: palette.neutralTertiary,
    iconColorHovered: palette.neutralTertiary,
    iconColorPressed: palette.neutralTertiary
  };
};

export const ActionButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  props.disabled && disabledTokens
];

export const ActionButton: ButtonVariantsType = props => {
  const { text, iconProps, ...rest } = props;

  return <Button stack={{ horizontalAlign: 'start' }} content={text} icon={iconProps} tokens={ActionButtonTokens} {...rest} />;
};
