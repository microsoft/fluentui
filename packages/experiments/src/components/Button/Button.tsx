import * as React from 'react';
import { createComponent } from '../../Foundation';
import { IButtonProps } from './Button.types';
import { ButtonView as view } from './Button.view';
import { ButtonStyles as styles, ButtonTokens as tokens } from './Button.styles';

export const Button: React.StatelessComponent<IButtonProps> = createComponent({
  displayName: 'Button',
  styles,
  tokens,
  view
});

export default Button;
