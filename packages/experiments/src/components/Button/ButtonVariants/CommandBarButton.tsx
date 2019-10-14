import * as React from 'react';
// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { useButtonState as state } from '../Button.state';
import { ButtonStyles as styles } from '../Button.styles';
import { IButtonComponent, IButtonProps, IButtonTokenReturnType } from '../Button.types';
import { ButtonSlots as slots, ButtonView as view } from '../Button.view';

const baseTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { palette, semanticColors } = theme;

  return {
    backgroundColor: palette.white,
    backgroundColorHovered: palette.neutralLighter,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,
    borderRadius: 0,
    borderWidth: 0,
    childrenGap: 8,
    contentPadding: '0px 8px',
    color: semanticColors.buttonText,
    colorHovered: semanticColors.buttonTextHovered,
    colorPressed: semanticColors.buttonTextPressed,
    cursor: 'pointer',
    highContrastBorderColor: 'transparent',
    highContrastBorderColorHovered: 'transparent',
    highContrastBorderColorPressed: 'transparent',
    highContrastColorHovered: 'Highlight',
    highContrastColorPressed: 'Highlight',
    highContrastIconColorHovered: 'Highlight',
    highContrastIconColorPressed: 'Highlight',
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
    cursor: 'default',
    highContrastColor: 'GrayText',
    highContrastColorHovered: 'GrayText',
    highContrastColorPressed: 'GrayText',
    highContrastIconColor: 'GrayText',
    highContrastIconColorHovered: 'GrayText',
    highContrastIconColorPressed: 'GrayText',
    iconColor: semanticColors.disabledBodySubtext,
    iconColorHovered: semanticColors.disabledBodySubtext,
    iconColorPressed: semanticColors.disabledBodySubtext
  };
};

const CommandBarButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  props.disabled && disabledTokens
];

export const CommandBarButton: React.StatelessComponent<IButtonProps> = composed({
  displayName: 'CommandBarButton',
  slots,
  state,
  styles,
  tokens: CommandBarButtonTokens,
  view
});
