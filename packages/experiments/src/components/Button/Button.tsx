import { createComponent } from '../../Foundation';
import { useButtonState as state } from './Button.state';
import { ButtonClassNames, ButtonStyles as styles, ButtonTokens as tokens } from './Button.styles';
import { IButtonProps } from './Button.types';
import { ButtonView } from './Button.view';

const classNames = Object.values(ButtonClassNames);

export const Button: React.StatelessComponent<IButtonProps> = createComponent(ButtonView, {
  classNames,
  displayName: 'Button',
  state,
  styles,
  tokens
});

export default Button;
