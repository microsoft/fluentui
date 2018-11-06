import * as React from 'react';
import { createComponent } from '../../Foundation';
import { IButtonProps, IButtonViewProps, IButtonStyles } from './Button.types';
import { ButtonState as state } from './Button.state';
import { ButtonView as view } from './Button.view';
import { getButtonStyles as styles } from './Button.styles';

export const Button: React.StatelessComponent<IButtonProps> = createComponent<IButtonProps, IButtonViewProps, IButtonStyles>({
  displayName: 'Button',
  styles,
  state,
  view
});

export default Button;
