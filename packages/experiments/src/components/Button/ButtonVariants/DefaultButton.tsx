import * as React from 'react';
import { createComponent } from '@uifabric/foundation';
import { useButtonState as state } from '../Button.state';
import {
  baseTokens,
  checkedTokens,
  circularTokens,
  disabledTokens,
  enabledTokens,
  hrefTokens,
  ButtonClassNames,
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

const classNames = Object.values(ButtonClassNames);

export const DefaultButton: React.StatelessComponent<IButtonProps> = createComponent(ButtonView, {
  classNames,
  displayName: 'DefaultButton',
  precedenceList: ['checked', 'disabled'],
  state,
  styles,
  tokens: DefaultButtonTokens
});
