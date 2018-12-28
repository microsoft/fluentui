import * as React from 'react';
import { createComponent } from '../../Foundation';
import { IButtonProps, IButtonTokens, IButtonViewProps, IButtonStyles } from './Button.types';
import { ButtonState as state } from './Button.state';
import { ButtonView as view } from './Button.view';
import { ButtonStyles as styles, ButtonTokens as tokens } from './Button.styles';

export const Button: React.StatelessComponent<IButtonProps> =
  createComponent<IButtonProps, IButtonViewProps, IButtonStyles, IButtonTokens>({
    displayName: 'Button',
    styles,
    state,
    tokens,
    view
  });

export default Button;
