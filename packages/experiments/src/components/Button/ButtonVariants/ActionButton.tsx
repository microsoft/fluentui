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
    backgroundColorHovered: 'transparent',
    backgroundColorPressed: 'transparent',
    borderColor: 'transparent',
    borderColorHovered: 'transparent',
    borderColorPressed: 'transparent',
    color: semanticColors.buttonText,
    colorHovered: palette.themePrimary,
    colorPressed: palette.black,
    contentPadding: '0px 8px',
    cursor: 'pointer',
    height: '40px',
    iconColor: semanticColors.buttonText,
    iconColorHovered: palette.themePrimary,
    iconColorPressed: palette.black,
    textWeight: FontWeights.regular
  };
};

const disabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;

  return {
    color: semanticColors.buttonTextDisabled,
    colorHovered: semanticColors.buttonTextDisabled,
    colorPressed: semanticColors.buttonTextDisabled,
    iconColor: semanticColors.buttonTextDisabled,
    iconColorHovered: semanticColors.buttonTextDisabled,
    iconColorPressed: semanticColors.buttonTextDisabled
  };
};

const ActionButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  props.disabled && disabledTokens
];

// TODO: Research how to fix this.
// const ActionButtonStackProps: IButtonProps['stack'] = {
//   horizontalAlign: 'start'
// };

export const ActionButton: React.StatelessComponent<IButtonProps> = createComponent(ButtonView, {
  displayName: 'ActionButton',
  state,
  styles,
  tokens: ActionButtonTokens
});
