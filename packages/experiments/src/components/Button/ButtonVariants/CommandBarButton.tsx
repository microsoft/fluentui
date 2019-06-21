import * as React from 'react';
import { createComponent } from '@uifabric/foundation';
import { useButtonState as state } from '../Button.state';
import { ButtonStyles as styles } from '../Button.styles';
import { IButtonComponent, IButtonProps, IButtonTokenReturnType } from '../Button.types';
import { ButtonView } from '../Button.view';

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

const CommandBarButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  props.disabled && disabledTokens
];

export const CommandBarButton: React.StatelessComponent<IButtonProps> = createComponent(ButtonView, {
  displayName: 'CommandBarButton',
  state,
  styles,
  tokens: CommandBarButtonTokens
});
