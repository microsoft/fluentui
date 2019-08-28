import * as React from 'react';
// Temporary import file to experiment with memoization approach.
import { createComponent } from '@uifabric/foundation/lib/next/createComponent';
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
import { ButtonView } from '../Button.view';

export const DefaultButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  !!props.href && hrefTokens,
  !props.disabled && enabledTokens,
  props.circular && circularTokens,
  props.checked && checkedTokens,
  props.disabled && disabledTokens
];

export const DefaultButton: React.StatelessComponent<IButtonProps> = createComponent(ButtonView, {
  displayName: 'DefaultButton',
  state,
  styles,
  tokens: DefaultButtonTokens
});
