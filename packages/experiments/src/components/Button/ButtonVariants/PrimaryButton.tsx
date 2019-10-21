import * as React from 'react';
// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { useButtonState as state } from '../Button.state';
import {
  baseTokens,
  circularTokens,
  disabledTokens,
  hrefTokens,
  primaryCheckedTokens,
  primaryCircularTokens,
  primaryEnabledTokens,
  ButtonStyles as styles
} from '../Button.styles';
import { IButtonComponent, IButtonProps, IButtonTokenReturnType } from '../Button.types';
import { ButtonSlots as slots, ButtonView as view } from '../Button.view';

export const PrimaryButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  !!props.href && hrefTokens,
  primaryEnabledTokens,
  props.circular && circularTokens,
  props.circular && primaryCircularTokens,
  props.checked && primaryCheckedTokens,
  props.disabled && disabledTokens
];

export const PrimaryButton: React.StatelessComponent<IButtonProps> = composed({
  displayName: 'PrimaryButton',
  slots,
  state,
  styles,
  tokens: PrimaryButtonTokens,
  view
});
