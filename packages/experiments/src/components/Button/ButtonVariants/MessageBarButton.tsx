import * as React from 'react';
// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { ITokenFunction } from '@uifabric/foundation';
import { useButtonState as state } from '../Button.state';
import { ButtonStyles as styles, ButtonTokens } from '../Button.styles';
import {
  IButtonComponent,
  IButtonProps,
  IButtonTokenReturnType,
  IButtonTokens,
  IButtonViewProps,
} from '../Button.types';
import { ButtonSlots as slots, ButtonView as view } from '../Button.view';

/* eslint-disable deprecation/deprecation */

const baseTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { palette } = theme;

  return {
    borderColor: palette.neutralTertiaryAlt,
    borderColorHovered: palette.neutralTertiaryAlt,
    borderColorPressed: palette.neutralTertiaryAlt,
    contentPadding: 0,
    cursor: 'pointer',
    height: 24,
    minHeight: 24,
    minWidth: 84,
    width: 84,
  };
};

const disabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;

  return {
    borderColor: semanticColors.buttonBorderDisabled,
    borderColorHovered: semanticColors.buttonBorderDisabled,
    borderColorPressed: semanticColors.buttonBorderDisabled,
    cursor: 'default',
  };
};

/** @deprecated */
export const MessageBarButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const regularTokens = (ButtonTokens as ITokenFunction<IButtonViewProps, IButtonTokens>)(props, theme);

  return [regularTokens, baseTokens, props.disabled && disabledTokens];
};

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 */
export const MessageBarButton: React.FunctionComponent<IButtonProps> = composed({
  displayName: 'MessageBarButton',
  slots,
  state,
  styles,
  tokens: MessageBarButtonTokens,
  view,
});
