import { createComponent } from '../../../Foundation';
import { ButtonStyles as styles, ButtonTokens as tokens } from './BaseButton.styles';
import { IBaseButtonProps } from './BaseButton.types';
import { useButtonState as state } from '../Button.state';
import { ButtonView } from '../Button.view';

export const BaseButton: React.StatelessComponent<IBaseButtonProps> = createComponent(ButtonView, {
  displayName: 'BaseButton',
  state,
  styles,
  tokens
});

export default BaseButton;
