import * as React from 'react';
import { createComponent } from '../../Foundation';
import { IButtonProps, IButtonViewProps, IButtonStyles } from './Button.types';
import { ButtonState as state } from './Button.state';
import { ButtonView as view } from './Button.view';
import { getButtonStyles as styles } from './Button.styles';

export const Button: React.StatelessComponent<IButtonProps> = createComponent<IButtonProps, IButtonViewProps, IButtonStyles>({
  displayName: 'Button',
  // RAGE, typings fail
  // tslint:disable-next-line:no-any
  styles: styles as any,
  // tslint:disable-next-line:no-any
  state: state as any,
  view
});

export default Button;
