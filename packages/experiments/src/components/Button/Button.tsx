// Temporary import file to experiment with memoization approach.
import { compose } from '@uifabric/foundation/lib/next/compose';
import { useButtonState as state } from './Button.state';
import { ButtonStyles as styles, ButtonTokens as tokens } from './Button.styles';
import { IButtonProps } from './Button.types';
import { ButtonView as view } from './Button.view';

export const Button: React.StatelessComponent<IButtonProps> = compose({
  displayName: 'Button',
  state,
  styles,
  tokens,
  view
});

export default Button;
