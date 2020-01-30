import * as React from 'react';
// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { useButtonState as state } from '../Button.state';
import {
  baseTokens,
  checkedTokens,
  circularTokens,
  disabledTokens,
  enabledTokens,
  hrefTokens,
  ButtonStyles as styles
} from '../Button.styles';
import { IButtonComponent, IButtonProps, IButtonTokenReturnType } from '../Button.types';
import { ButtonSlots as slots, ButtonView as view } from '../Button.view';

export const DefaultButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  !!props.href && hrefTokens,
  !props.disabled && enabledTokens,
  props.circular && circularTokens,
  props.checked && checkedTokens,
  props.disabled && disabledTokens
];

export const DefaultButton: React.StatelessComponent<IButtonProps> = composed({
  displayName: 'DefaultButton',
  slots,
  state,
  styles,
  tokens: DefaultButtonTokens,
  view
});
