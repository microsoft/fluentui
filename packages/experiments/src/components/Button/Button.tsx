// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { useButtonState as state } from './Button.state';
import { ButtonStyles as styles, ButtonTokens as tokens } from './Button.styles';
import { IButtonProps } from './Button.types';
import { ButtonSlots as slots, ButtonView as view } from './Button.view';

export const Button: React.StatelessComponent<IButtonProps> = composed({
  displayName: 'Button',
  slots,
  state,
  styles,
  tokens,
  view
});

export default Button;
