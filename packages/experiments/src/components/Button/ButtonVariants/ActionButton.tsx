import * as React from 'react';
// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { IComponentStyles, IStylesFunction } from '@uifabric/foundation';
import { FontWeights } from '../../../Styling';
import { useButtonState as state } from '../Button.state';
import { ButtonStyles } from '../Button.styles';
import {
  IButtonComponent,
  IButtonProps,
  IButtonSlots,
  IButtonStylesReturnType,
  IButtonTokenReturnType,
  IButtonTokens,
  IButtonViewProps
} from '../Button.types';
import { ButtonSlots as slots, ButtonView as view } from '../Button.view';

const baseTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { effects, palette, semanticColors } = theme;

  return {
    backgroundColor: 'transparent',
    backgroundColorHovered: 'transparent',
    backgroundColorPressed: 'transparent',
    borderColor: 'transparent',
    borderColorHovered: 'transparent',
    borderColorPressed: 'transparent',
    borderRadius: effects.roundedCorner2,
    borderStyle: 'solid',
    borderWidth: 1,
    childrenGap: 8,
    color: semanticColors.buttonText,
    colorHovered: palette.themePrimary,
    colorPressed: palette.black,
    contentPadding: '0px 8px',
    cursor: 'pointer',
    height: '40px',
    highContrastBorderColor: 'transparent',
    highContrastBorderColorHovered: 'transparent',
    highContrastBorderColorPressed: 'transparent',
    highContrastColorHovered: 'Highlight',
    highContrastColorPressed: 'Highlight',
    highContrastIconColorHovered: 'Highlight',
    highContrastIconColorPressed: 'Highlight',
    iconColor: semanticColors.buttonText,
    iconColorHovered: palette.themePrimary,
    iconColorPressed: palette.black,
    iconSize: 16,
    minWidth: 100,
    textWeight: FontWeights.regular
  };
};

const disabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;

  return {
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
    iconColor: semanticColors.buttonTextDisabled,
    iconColorHovered: semanticColors.buttonTextDisabled,
    iconColorPressed: semanticColors.buttonTextDisabled
  };
};

const ActionButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  props.disabled && disabledTokens
];

const ActionButtonStyles: IButtonComponent['styles'] = (props, theme, tokens): IButtonStylesReturnType => {
  const regularStyles = (ButtonStyles as IStylesFunction<IButtonViewProps, IButtonTokens, IComponentStyles<IButtonSlots>>)(
    props,
    theme,
    tokens
  );

  return {
    root: [
      regularStyles.root,
      {
        justifyContent: 'flex-start'
      }
    ],
    content: regularStyles.content,
    icon: regularStyles.icon
  };
};

export const ActionButton: React.StatelessComponent<IButtonProps> = composed({
  displayName: 'ActionButton',
  slots,
  state,
  styles: ActionButtonStyles,
  tokens: ActionButtonTokens,
  view
});
