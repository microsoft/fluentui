import * as React from 'react';
import { createComponent } from '@uifabric/foundation';
import { useButtonState as state } from '../Button.state';
import { ButtonStyles as styles, ButtonTokens as tokens } from '../Button.styles';
import { IButtonProps } from '../Button.types';
import { ButtonView } from '../Button.view';

export const PrimaryButton: React.StatelessComponent<IButtonProps> = createComponent(ButtonView, {
  displayName: 'PrimaryButton',
  state,
  styles,
  tokens
});
