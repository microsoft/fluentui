import { createComponent } from '../../Foundation';
import { useButtonState as state } from './Button.state';
import { ButtonStyles as styles, ButtonTokens as tokens } from './Button.styles';
import { IButtonProps } from './Button.types';
import { ButtonView } from './Button.view';

export const Button: React.StatelessComponent<IButtonProps> = createComponent(ButtonView, {
  displayName: 'Button',
  state,
  styles,
  tokens
});

export default Button;
