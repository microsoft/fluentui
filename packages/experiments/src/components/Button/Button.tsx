import * as React from 'react';
import { createComponent } from '../../Foundation';
import { ButtonState as state } from './Button.state';
import { ButtonStyles as styles, ButtonTokens as tokens } from './Button.styles';
import { IButtonProps } from './Button.types';
import { ButtonView as view } from './Button.view';

export const Button: React.StatelessComponent<IButtonProps> = createComponent({
  displayName: 'Button',
  state,
  styles,
  tokens,
  view
});

export default Button;
