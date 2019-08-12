import * as React from 'react';
import { createComponent } from '@uifabric/foundation';
import { useButtonState as state } from '../Button.state';
import {
  baseTokens,
  circularTokens,
  disabledTokens,
  hrefTokens,
  primaryCheckedTokens,
  primaryCircularTokens,
  primaryEnabledTokens,
  ButtonClassNames,
  ButtonStyles as styles
} from '../Button.styles';
import { IButtonComponent, IButtonProps, IButtonTokenReturnType } from '../Button.types';
import { ButtonView } from '../Button.view';

export const PrimaryButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  !!props.href && hrefTokens,
  primaryEnabledTokens,
  props.circular && circularTokens,
  props.circular && primaryCircularTokens,
  props.checked && primaryCheckedTokens,
  props.disabled && disabledTokens
];

const classNames = Object.values(ButtonClassNames);

export const PrimaryButton: React.StatelessComponent<IButtonProps> = createComponent(ButtonView, {
  classNames,
  displayName: 'PrimaryButton',
  precedenceList: ['checked', 'disabled'],
  state,
  styles,
  tokens: PrimaryButtonTokens
});
